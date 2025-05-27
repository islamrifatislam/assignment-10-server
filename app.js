import cors from 'cors';
import express from "express";
import { ObjectId } from 'mongodb';
import { appliedVisa, visaInfoDB } from './server.js';
const app = express()

// express middleware
app.use(express.json())
app.use(express.raw())
app.use(cors())

// manage resposne
const manageResponse = (res, data) => {
     res
          .status(data?.statusCode)
          .json({
               success: data?.success,
               message: data?.message,
               data: data?.data
          })
}

// stating route
app.get("/", async (req, res) => {
     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Server is working fine",
          data: null
     })
})
app.get('/visa/:id', async (req, res) => {
     const { id } = req?.params
     const result = await visaInfoDB.findOne({ _id: new ObjectId(id) })
     if (!result) {
          manageResponse(res, {
               statusCode: 404,
               success: false,
               message: "Visa_data is not found",
               data: null
          })
          return
     }
     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Visa info fetced successful",
          data: result
     })
})
pp.get('/visa/email/:email', async (req, res) => {
     const { email } = req?.params
     const result = await visaInfoDB.find({ user_email: email }).toArray()
     if (!result) {
          manageResponse(res, {
               statusCode: 404,
               success: false,
               message: "Visa_data is not found",
               data: null
          })
          return
     }
     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Visa info fetced successful",
          data: result
     })
})
export default app;





