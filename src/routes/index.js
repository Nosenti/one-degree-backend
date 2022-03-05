
   
import express from 'express';
import authController from '../controllers/auth.js';
import userController from '../controllers/user.js';
import checkAuth from '../middleware/checkAuth.js';
import {userSignInValidate} from '../validators/userSigninValidator.js';
import {userValidate} from '../validators/userValidate.js';


const router = express.Router()
router.use(express.json());

router.get('/',(req,res)=>{
  res.status(200).send('Welcome to OneDegree')
})
router.post('/users/signup', userValidate,authController.signup)
router.get('/users/auth', checkAuth.verifyUser, authController.auth)
router.post('/users/signin', userSignInValidate, authController.signin)

router.post('/users/:id/match/:connectedId',checkAuth.verifyUser, userController.match);
router.post('/users/:id/connect',checkAuth.verifyUser, userController.connect);
router.put('/connections/:id/approve', checkAuth.verifyUser, userController.approveConnection)
router.put('/suggestions/:id/approve', checkAuth.verifyUser, userController.approveMatch)



export default router;