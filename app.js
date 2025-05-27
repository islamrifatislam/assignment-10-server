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
app.patch('/visa/:id', async (req, res) => {
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
     const updatedData = await visaInfoDB.updateOne
          ({ _id: new ObjectId(id) }, {
               $set: {
                    ...req?.body
               }
          })

     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Visa info update successful",
          data: updatedData
     })
})
app.delete('/visa/:id', async (req, res) => {
     const { id } = req?.params
     const result = await visaInfoDB.findOne({ _id: new ObjectId(id) })
     if (!result) {
          manageResponse(res, {
               statusCode: 404,
               success: true,
               message: "Visa info not found",
               data: null,

          })
          return
     }
     const deletdData = await visaInfoDB.deleteOne({ _id: result._id })
     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Visa info deleted!!",
          data: deletdData
     })
})
/ applied visa--------------//
app.post("/applied-visa", async (req, res) => {
     const payload = {
          ...req?.body,
          applied_date: new Date()
     }
     const result = await appliedVisa.insertOne(payload)
     manageResponse(res, {
          success: true,
          statusCode: 201,
          message: "visa appied successful",
          data: result
     })
})
app.get("/applied-visa/:email", async (req, res) => {
     const { email } = req?.params
     const result = await appliedVisa.find({ applicant_email: email }).toArray()
     manageResponse(res, {
          success: true,
          statusCode: 200,
          message: "My applied visa fetched",
          data: result
     })
})
app.patch("/applied-visa/update/:id", async (req, res) => {
     const { id } = req?.params
     const result = await appliedVisa.findOne({ _id: new ObjectId(id) })
     if (!result) {
          manageResponse(res, {
               statusCode: 404,
               success: false,
               message: "Applied data not found",
               data: null
          })
          return
     }
     const updatedData = await appliedVisa.updateOne
          ({ _id: new ObjectId(id) }, {
               $set: {
                    ...req?.body
               }
          })

     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Applied visa update successful",
          data: updatedData
     })
})

app.delete('/applied-visa/delete/:id', async (req, res) => {
     const { id } = req?.params
     const result = await appliedVisa.findOne({ _id: new ObjectId(id) })
     if (!result) {
          manageResponse(res, {
               statusCode: 404,
               success: true,
               message: "Visa info not found",
               data: null,

          })
          return
     }
     const deletdData = await appliedVisa.deleteOne({ _id: result._id })
     manageResponse(res, {
          statusCode: 200,
          success: true,
          message: "Applied visa info deleted!!",
          data: deletdData
     })
})



export default app;





