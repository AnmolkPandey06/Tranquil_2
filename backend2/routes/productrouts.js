const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
//middleware


//model
const Product = require('../Models/products');
const cart=require('../Models/cart');
const user=require('../Models/user');
const sold=require('../Models/solddetails');

const control = require('../Controllers/productcontroller');


const { protect } = require("../Middlewares/authMiddleware");

router.get('/',catchAsync(control.isloggedin));

router.delete('/cart/:pid',catchAsync(control.deleteproductsingle));

router.get('/clearcart',catchAsync(control.deletemanyproduct));

router.post('/changecount/:pid',catchAsync(control.changecount));

// router.update('/')

router.get('/buyproduct',catchAsync(control.buyproduct));

router.post('/addtocart',catchAsync(control.addtocart));

module.exports=router;