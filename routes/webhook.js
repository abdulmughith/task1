const router = require('express').Router();
const messageService = require('../service/message')


router.post('/', (req, res) =>  {
  console.log('messageWebhook:: new');
  const { body } = req;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      if (entry.messaging && entry.messaging.length) {
        const WEBHOOK_EVENT = entry.messaging[0];
        const senderId = WEBHOOK_EVENT.sender.id;

        if (WEBHOOK_EVENT.message) {
          messageService.processIncomingMessage(senderId, WEBHOOK_EVENT.message);
          console.log('message', WEBHOOK_EVENT.message);
        }
        //  else if (WEBHOOK_EVENT.postback) {
        //   console.log('postback', WEBHOOK_EVENT.postback);
        //   processPostback(senderId, WEBHOOK_EVENT.postback);
        // }
      } else {
        console.log('no messaging', entry);
      }
    });
    res.status(200).end();
  }
})
 
router.get('/',(req,res)=>{

    let VERIFY_TOKEN = process.env.VERIFY_TOKEN
      
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    if (mode && token) {
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } 
      else res.sendStatus(403);      
      
    }

})

module.exports = router;