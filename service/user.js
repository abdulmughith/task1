const userModel = require('../model/User')
const {redisClient} = require('../lib/redis') 

const fromStringToBool = (str) => ((str === "true") ? true : false)

const isFirstTime = async (userId) => {

    try {
        let cacheKey = `isFirstTime-${userId}`
        let userFristTimeCache = await redisClient.get(cacheKey);

        if (userFristTimeCache) {
            return fromStringToBool(userFristTimeCache)
        }


        let userCount = await userModel.find({ id: userId }).count()
        let res = userCount === 0
        let cacheResponse = await redisClient.set(cacheKey, res);
        console.log("inserted to cache",cacheResponse)

        return res

    } catch (err) {
        console.log("error in userModel isFirstTime func", err.message)
        return false
    }



}



const createUser = async (userId) => {

    try {
        await userModel.create({ id: userId })

    } catch (err) {
        console.log("error in userModel create func", err.message)
    }


}

module.exports = {
    isFirstTime,
    createUser
}