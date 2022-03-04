
   
import express from 'express';
import authController from '../controllers/auth.js';
import checkAuth from '../middleware/checkAuth.js';
import {userSignInValidate} from '../validators/userSigninValidator.js';
import {userValidate} from '../validators/userValidate.js';


const router = express.Router()
router.use(express.json());

router.get('/',(req,res)=>{
  res.status(200).send('Welcome to ALUxFeed')
})
router.post('/users/signup', userValidate,authController.signup)
router.get('/users/auth', checkAuth.verifyUser, authController.auth)
router.post('/users/signin', userSignInValidate, authController.signin)


export default router;