const express = require("express");
const { authentication } = require("../middleware/authentication");
const { CartModel } = require("../model/cartModel");
const { OrderModel } = require("../model/orderModel");

const orderRouter = express();


orderRouter.post("/placed",authentication,async(req,res)=>{
    
    const {userId,email} = req.body;
    try {
      var cartData =  await CartModel.findOne({user:userId})
    
      if(!cartData){return res.send("You have to add product in cart first")}
      console.log(cartData)
      var {cart} = cartData
      if(cart.length!=0){

        const x =   OrderModel({user:userId,orderStatus:"placed"})
        const y =await x.save()
        res.send(y)
      }else{
        res.send("you have to add product to cart then you should buy only")
      }
    } catch (error) {
        console.log(error)
        res.send("error while ordering product")
    }
})


orderRouter.get("/orderdetails",authentication,async(req,res)=>{
  const {userId,email} = req.body

  const cartData = await CartModel.findOne({user:userId})
  if(cartData.cart.length==0){
    return res.send("You have no order")
  }
  res.send({details:cartData,orderStatus:"placed"})
})

module.exports = {orderRouter}