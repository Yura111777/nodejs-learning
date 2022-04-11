const express = require('express');
const viewController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/signup', viewController.signup);

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.login);
router.get('/profile', viewController.getProfile);
router.get(
  '/update-user',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
