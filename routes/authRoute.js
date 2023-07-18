import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

// router Object
const router = express.Router();

// routing
router.post('/register', registerController);
router.post('/login', loginController);

router.get('/test', requireSignin, isAdmin, testController);
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'User authenticated successfully',
        ok: true
    })
});

export default router;