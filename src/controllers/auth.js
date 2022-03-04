
import User from '../models/User.js';
import crypto from 'crypto';
import { hashPassword, comparePassword, jwtToken, createPasswordResetToken } from '../utils/jwtToken.js';
import gravatar from 'gravatar';

export default class Auth {

  static async auth(req,res){
    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(user)
      return res.status(200).send(user)
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: 'server error'
      })
    }
  }

  static async signup(req, res) {
    try {
      const {
        name,
        email,
        password,
        passwordConfirm
      } = req.body;

      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(409).send({
          message: 'user already exists'
        });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r:'pg',
        d:'mm'
      })
      
      if( passwordConfirm !== password){
        return res.status(400).send({
          status: 400,
          message:"Password and confirm password do not match"
        })
      }
      const hash = hashPassword(password);
      const user = await User.create({
        name,
        email,
        avatar,
        password:hash,
        role:'user'
      });
      const token = jwtToken.createToken(user);
      user.verifyToken = token;
      user.save();
      
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        status: 500,
        message: 'Server Error'
      });
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if (!user) return res.status(400).send({ status: 400, error: "User doesn't exist" });
      if (user && comparePassword(password, user.password)) {
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token });
      }
      return res.status(400).send({ status: 400, message: 'invalid email/password combination ' });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'Server Error'
      });
    }
  }
  
}
