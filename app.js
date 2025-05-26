import cors from 'cors';
import express from "express";
import { ObjectId } from 'mongodb';
import { datas } from './server.js';
const app = express()

// express middleware
app.use(express.json())
app.use(express.raw())
app.use(cors())


// manage resposne
const manageResponse = (res,data)=>{
     res
     .status(data?.statusCode)
     .json({
          success:data?.success,
          message:data?.message,
          data:data?.data
     })
}

// stating route
app.get("/",async(req,res)=>{
     manageResponse(res,{
          statusCode:200,
          success:true,
          message:"Server is working fine",
          data:null
     })
})

// post the mianrequirmentdatas
app.post('/visa',async(req,res)=>{
     const result = await datas.insertOne(req?.body)
     manageResponse(res,{
          success:true,
          statusCode: 201,
          message:"Visa information created.",
          data:result
     })
})
app.get('/allvisadata',async(req,res)=>{
     const result = await datas.find().toArray()
     manageResponse(res,{
          statusCode:200,
          success:true,
          message:"The all data is founded successfully",
          data:result

     })
})
app.get('/singlevisadatas/:id',async(req,res)=>{
     const {id} = req?.params
     const result = await datas.findOne({_id: new ObjectId(id)})
     if(!result){
          manageResponse(res,{
               statusCode:404,
               success:false,
               message:"Visa_data is not found",
               data:null
          })
          return
     }
     manageResponse(res,{
          statusCode:200,
          success:true,
          message:"Your visa deta is founded successfully",
          data:result
     })
})


app.delete('/deletevisadata/:id',async(req,res)=>{
     const {id} = req?.params
     const result = await datas.findOne({_id : new ObjectId(id)})
     if(!result){
          manageResponse(res,{
               statusCode:404,
               success:true,
               message:"Your daa is not found plese chek",
               data : null,

          })
     return
     }
     manageResponse(res,{
          statusCode:200,
          success:true,
          message:"Uour details is successfully deleted",
          data:result
     })
})

// app.patch("/visauptodate/:id",async(req,res)=>{
//      const {id} = req.params
//      const result = await datas.updateOne({_id: new ObjectId(id)},req?.body)
//      if(!result){
//           manageResponse(res,{
//                statusCode:404,
//                success:false,
//                message:"The updated data is not found",
//                data : null
//           })
//           return
//      }

//      manageResponse(res,{
//           statusCode:200,
//           success:true,
//           message:"Your data is successfully aded",
//           data:result
//      })
// })





export default app;





