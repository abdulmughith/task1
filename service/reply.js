const axios = require('axios');

const sendTextMessage = async (senderId, response) => {

    response = {'text':response}
    const request_body = {
        'recipient': {
            'id': senderId
        },
        'message': response
    }

    try {

        await axios.post('https://graph.facebook.com/v12.0/me/messages?access_token=' + process.env.ACCESS_TOKEN, {
            ...request_body
        })

    } catch (err) {
        console.error("Error while sending message:", err.message)
    }
}

module.exports = {
    sendTextMessage
}