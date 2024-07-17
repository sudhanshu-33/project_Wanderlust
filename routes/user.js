const express=require("express");
const router =express.Router();
const User = require("../models/user.js")
const wrapasync = require("../utils/wrapAsync.js");
const passport = require("passport");
const isLoggedIn =require("../middleware.js")
const {saveRedirectUrl} =require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")    
    .get(userController.renderSignupForm) 
    .post(wrapasync(userController.signup));

router
     .route("/login")
     .get(userController.renderLoginForm)
     .post(saveRedirectUrl ,passport.authenticate("local" ,
        {failureRedirect:"/login" ,
           failureFlash:true}) ,
           userController.login);
       
router.get("/logout" , userController.logout);

module.exports=router;