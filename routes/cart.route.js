const express = require("express");
const { authentication } = require("../middleware/authentication");
const { productModel } = require("../model/product.model");
const { CategoryModel } = require("../model/categories.model");
const { CartModel } = require("../model/cartModel");
const { UserModel } = require("../model/user.model");

const cartRoute = express();

cartRoute.get("/", authentication,async (req, res) => {
  const productId = req.params.productId;
  const { userId, email } = req.body;
  
    var user = await CartModel.findOne({ user: userId });
    if(!user){
      return res.send("your cart is empty")
    }
    res.send(user)
});

cartRoute.post("/add/:productId", authentication, async (req, res) => {
  const productId = req.params.productId;
  const { userId, email } = req.body;
  try {
    var user = await CartModel.findOne({ user: userId });
    var product = await productModel.findOne({ _id: productId });
    console.log("product",product)
    if (!user) {
      var data = CartModel({
        user: userId,
        cart: [
          {
            productId,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: 1,
          },
        ],

        totalquantity: 1,

        totalPrice: product.price,
      });
      var newData = await data.save();
      res.send(newData);
    } 
    else{
      var check=0
      var cartData = user;
      var {cart} = cartData
      for(var i=0;i<cart.length;i++){
        // console.log(cart[i].productIdproductId)
        if(cart[i].productId==productId){
          check=1
          cart[i].quantity = cart[i].quantity+1
          break;
        }
      }
      if(check==1){
      cartData.totalquantity = cartData.totalquantity+1;
      cartData.totalPrice = +cartData.totalPrice+(+product.price)
      }else{
        // product.quantity=1
        cart.push({
          productId,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: 1,
        })
        cartData.totalquantity = cartData.totalquantity+1;
        cartData.totalPrice = +cartData.totalPrice+(+product.price)
      }
      cartData.cart = cart
      await CartModel.findOneAndUpdate({user:userId},cartData)
      return res.send(cartData)
    }
    
    
  } catch (error) {
    console.log(error);
    res.send("something went wrong in cart add");
  }
});

cartRoute.delete("/:productId", authentication, async (req, res) => {
  const productId = req.params.productId;
  const { userId, email } = req.body;
  
    var cartData = await CartModel.findOne({ user: userId });
    var product = await productModel.findOne({ _id: productId });
    if (!cartData) {
      return res.send("Your cart is empty")
    }
    
    var {cart} = cartData;
    var newCart = []
    for(var i=0;i<cart.length;i++){
      if(cart[i].productId==productId){
        if(cart[i].quantity==1){
          continue
        }
        cart[i].quantity = cart[i].quantity-1
      }
      newCart.push(cart[i])
    }
    cartData.totalquantity = cartData.totalquantity-1;
      cartData.totalPrice = +cartData.totalPrice-(+product.price)
      cartData.cart = newCart
      await CartModel.findOneAndUpdate({user:userId},cartData)
    res.send(cartData)
  })

module.exports = { cartRoute };
