require('dotenv').config()
const cors=require('cors')
const express=require('express');
const port=process.env.PORT
const sendTo=require("./routes/emailRoutes")

const app=express()




app.use(express.json())
app.use(cors({
    origin:'',
    methods:'GET,POST,HEAD,PATCH,DELETE',
    allowedHeaders:'Content-Type, Authorization'
}))
app.use('/api',sendTo)




app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})