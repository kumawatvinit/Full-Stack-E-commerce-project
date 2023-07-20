import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

// router Object
const router = express.Router();

// routing
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);

router.get('/test', requireSignin, isAdmin, testController);
router.get('/userauth', requireSignin, (req, res) => {
    // console.log("Request has reached the user-auth route");
    res.status(200).json({
        success: true,
        message: 'User authenticated successfully',
        ok: true
    });
});

export default router;