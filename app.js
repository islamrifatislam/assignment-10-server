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

export default app;





