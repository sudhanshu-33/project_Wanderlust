const express=require("express");
const router =express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router 
    .route("/")
    .get(wrapAsync(listingController.index))                                          //index route
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validatelisting,
       
        wrapAsync(listingController.createListing));                                  //create route
  
 //new route
router
   .route("/new")
    .get(
    isLoggedIn ,
    listingController.renderNewform);
    
router
    .route("/:id")
    .get(                                                                       //show route
        wrapAsync(listingController.showListing))
    .put(isLoggedIn ,                                                            //update route
        isOwner,
        upload.single("listing[image]"),
        validatelisting ,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,                                                            // delete route
        isOwner,
        wrapAsync(listingController.destroyListing));

//edit route
 router.get("/:id/edit",
     isLoggedIn,isOwner ,
      wrapAsync(listingController.renderEditForm));

module.exports=router;