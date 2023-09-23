const express = require("express");
const { productRoute } = require("./routes/routes.route");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoute");
const { cartRoute } = require("./routes/cart.route");
const { orderRouter } = require("./routes/orderRoute");
require("dotenv").config()
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
app.use(express.json());


const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/",(req,res)=>{
    res.send("welcome")
})


app.use("/product",productRoute)
app.use("/user",userRouter)
app.use("/cart",cartRoute)
app.use("/order",orderRouter)



app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log(`server is running is on ${process.env.port}`)
    } catch (error) {
        console.log("error while running")
    }
});