const express = require("express");
const {CategoryModel} = require("../model/categories.model");
const { productModel } = require("../model/product.model");
const productRoute = express()


productRoute.get("/category",async (req,res)=>{
    
  try {
    
  var x = await CategoryModel.aggregate([{$project:{title:1,_id:0}}])

 var list = x.map(ele=>{
  return ele.title
 })
      res.send({categories:list})
      
  } catch (error) {
    console.log(error)
   res.send("error") 
  }
})


productRoute.post("/category",async(req,res)=>{
  const x =await CategoryModel.insertMany([
    {
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]
  )
  res.send(x)
})


// productRoute.post("/product",async(req,res)=>{

//   const productData =  [
//         {
        
//           name: 'Brown Brim',
//           imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
//           price: 25,
//           description: 'A stylish brown brim hat that adds a touch of sophistication to your look.',
//           title: 'Hats'
//         },
//         {
        
//           name: 'Blue Beanie',
//           imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
//           price: 18,
//           description: 'Stay warm and fashionable with this cozy blue beanie.',
//           title: 'Hats'
//         },
//         // ... (other hat items with descriptions)
      
    
    
//         {title: 'Sneakers',
          
//           name: 'Adidas NMD',
//           imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
//           price: 220,
//           description: 'Step up your sneaker game with the stylish and comfortable Adidas NMD.',
//         },
//         {
//           title: 'Sneakers',
//           name: 'Adidas Yeezy',
//           imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
//           price: 280,
//           description: 'Elevate your sneaker collection with the iconic Adidas Yeezy.',
//         },
//         // ... (other sneaker items with descriptions)
      
   
//         {
//           title: 'Jackets',
//           name: 'Black Jean Shearling',
//           imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
//           price: 125,
//           description: 'Stay warm and fashionable with this black jean shearling jacket.',
//         },
//         {
//           title: 'Jackets',
//           name: 'Blue Jean Jacket',
//           imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
//           price: 90,
//           description: 'A classic blue jean jacket that\'s perfect for any casual occasion.',
       
//         },
      
//         {
//           title: 'Womens',
//           name: 'Blue Tanktop',
//           imageUrl: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
//           price: 25,
//           description: 'Stay cool and casual with this blue tank top for women.',
//         },
//         {
//           title: 'Womens',
//           name: 'Floral Blouse',
//           imageUrl: 'https://i.ibb.co/4W2DGKm/floral-blouse.png',
//           price: 20,
//           description: 'Add a touch of elegance to your wardrobe with this floral blouse.',
//         },
//         {
//           title: 'Mens',
//           name: 'Camo Down Vest',
//           imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
//           price: 325,
//           description: 'Stay warm and stylish with this camo down vest for men.',
//         },
//         {
//           title: 'Mens',
//           name: 'Floral T-shirt',
//           imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
//           price: 20,
//           description: 'Add a touch of floral flair to your casual look with this t-shirt.',
//         },
//    ];

//   for(var i=0;i<productData.length;i++){
//     // console.log(productData[i].title)
//   var title = await CategoryModel.find({title:productData[i].title.toLowerCase()})
//   var categoryId = title[0]._id
// var obj = {...productData[i],categoryId}
//   var x = productModel(obj)
//   var y = await x.save()

//   }

// // var obj = {}
// //   var x = productModel(obj)
// //   var y = await x.save()
  

//   res.send('done')


// })


productRoute.get("/product",async(req,res)=>{
  try {
  var data =  await productModel.aggregate([{$project:{_id:0,__v:0}}])


  res.send(data) 
  } catch (error) {
    console.log(error)
    res.send({error:error.message})
  }
})

productRoute.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const data = await productModel.findOne({_id:id});

    const newData = data
    res.send(newData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); // You might want to send an appropriate status code
  }
});




module.exports = {productRoute}