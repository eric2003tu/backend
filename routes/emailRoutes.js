const authSend=require('../controller/Email')

const router=require("express").Router();
router.post('/send',authSend)

module.exports=router