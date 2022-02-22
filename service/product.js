

const products = require("../products.json")
const { sgMail } = require("../lib/mail")


const getProductInfo = (productId, attribute) => {
    let foundedProduct = products.find(function (item) {
        return item.sku == productId
    });

    if (foundedProduct === undefined)
        return "product not found!"

    return foundedProduct[attribute]

}

const getProductAllInfo = (productId) => {
    let foundedProduct = products.find(function (item) {
        return item.sku == productId
    });
    if (foundedProduct === undefined)
        return {}
    return foundedProduct
}
//TODO
// to refactor make from,templateId in config file + pass dynamicTemplateData as var
// using some queue instead of call direct API
const sendBuyEmail = (ProductInfo,to='mzaza7967@gmail.com') => {
    const msg = {
        to: to,
        from: 'abdalmugith@gmail.com',
        templateId: 'd-ea7445b094e2432eb204a14250475a20',
        subject:'notify email',
        dynamicTemplateData: {
            url:ProductInfo["url"],
            name:ProductInfo["name"],
            price:ProductInfo["price"],
            fees:ProductInfo["shipping"],
            desc:ProductInfo["description"],
        },
    };
    sgMail.send(msg);
}


function productInfoResult(command, prodId) {
    switch (command) {
        case "desc":
            return getProductInfo(prodId, "description")
        case "price":
            return getProductInfo(prodId, "price")
        case "shipping":
            return getProductInfo(prodId, "shipping")
        case "buy":
            let prod= getProductAllInfo(prodId)
            if(!prod["sku"])
                return "product not found!"
            sendBuyEmail(prod)
            return "thank u for buy this!"
    }
}
module.exports = {
    productInfoResult
}