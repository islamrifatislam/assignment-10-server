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



export default app;





