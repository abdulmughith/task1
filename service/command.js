const { sendTextMessage } = require('./reply');
const { productInfoResult } = require('./product');


const commandList = ["desc", "price", "shipping", "buy"]

const commandDelameter = "/"

const checkIfCommand = message => message.startsWith(commandDelameter)

const commandNotFound = "commandNotFound"

const getProductId = (message) => {
    try {
        let messageSplited = message.split(" ")
        let prodId = messageSplited[1] ? messageSplited[1] : "";
        return prodId
    }
    catch (err) {
        return ""
    }

}

const isCommandDefended = (cmd) => commandList.includes(cmd)

const getCommand = (message) => {
    try {
        let messageSplited = message.split(" ")
        return messageSplited[0].substring(1)
    }
    catch (err) {

        return commandNotFound
    }

}

const processCommand = async (sender, message) => {

    let cmd = getCommand(message)
    if (!isCommandDefended(cmd)) {
        await sendTextMessage(sender, "pls send correct command" )
        return
    }

    let productId = getProductId(message)
    if (productId == "") {
        await sendTextMessage(sender,  "pls send command with product id" )
        return
    }
    await sendTextMessage(sender,  productInfoResult(cmd,productId) )

    
    

}



module.exports = {
    checkIfCommand,
    processCommand
}