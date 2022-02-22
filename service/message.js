'use strict';
const { processCommand, checkIfCommand } = require('./command');
const { sendTextMessage } = require('./reply');
const { isFirstTime,createUser } = require('./user');




const greetingArray = ["Hi", "Hello", "Good morning"]
const greetingReplies = ["How are you?", "I hope you're doing well.", "I hope you're having a great day."]
const defultMessage = "please send command in this way \n /desc product id"

const checkIfGreeting = message => greetingArray.includes(message)

const replyGreeting = () => greetingReplies[Math.floor(Math.random() * greetingReplies.length)]


const processIncomingMessage = async (sender, message) => {

    const {text } = message;
    //improvment do caching for this value
    let fristTime = await isFirstTime(sender)

    if (fristTime){
        
        await sendTextMessage(sender,  "first time here" )
        await sendTextMessage(sender,  replyGreeting() )
        await createUser(sender)
        return

    }

    if (checkIfGreeting(text)) {

        await sendTextMessage(sender,  replyGreeting() )
        return

    }


    if (checkIfCommand(text)) {

        await processCommand(sender, text)
        return
    
    }

    await sendTextMessage(sender, defultMessage)
}






module.exports = {
    processIncomingMessage,
}