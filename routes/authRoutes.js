import express from 'express';
import { signup,login } from '../controllers/AuthController';
import passport from '../config/passport';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/otp/send:
 *   post:
 *     summary: Send OTP to user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid email
 */
router.post('/otp/send', AuthController.sendOTP);

/**
 * @swagger
 * /auth/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post('/otp/verify', AuthController.verifyOTP);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Redirect to Google authentication
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google login successful
 *       400:
 *         description: Google login failed
 */
router.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.socialLogin);

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Facebook authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Redirect to Facebook authentication
 */
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Facebook authentication callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Facebook login successful
 *       400:
 *         description: Facebook login failed
 */
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), AuthController.socialLogin);

/**
 * @swagger
 * /auth/apple:
 *   get:
 *     summary: Apple authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Redirect to Apple authentication
 */
router.get('/apple', passport.authenticate('apple'));

/**
 * @swagger
 * /auth/apple/callback:
 *   get:
 *     summary: Apple authentication callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Apple login successful
 *       400:
 *         description: Apple login failed
 */
router.get('/apple/callback', passport.authenticate('apple', { session: false }), AuthController.socialLogin);

/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Invalid email
 */
router.post('/password/reset', AuthController.sendPasswordResetEmail);

/**
 * @swagger
 * /auth/password/reset/confirm:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or password
 */
router.post('/password/reset/confirm', AuthController.resetPassword);

export default router;
