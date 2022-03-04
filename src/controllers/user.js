import User from '../models/User.js';
import crypto from 'crypto';
import { hashPassword, comparePassword, jwtToken, createPasswordResetToken } from '../utils/jwtToken.js';
import sendEmail from '../utils/email.js';
 const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el=>{
      if(allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
  }
export default class User_ {

 static async getUsers(req, res){
   try {
     const users = await User.find({});
     res.status(200).send(users)
   } catch (error) {
     console.log(error)
     res.status(500).send({
       status: 500,
       message: 'Server error'
     })
     
   }
 }

}