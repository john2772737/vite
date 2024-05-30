const express = require("express");
const mongooese = require("mongoose");
const cors = require("cors");
const adminroute = require("./router/admin.router");
const sellerroute=require('./router/seller.route');
const userRoute= require('./router/user.route');
const productRoute= require('./router/product.router') 
const voucherRoute= require('./router/voucher.router')
const cartRoute= require('./router/cart.router')
const ordersRoute= require('./router/order.router')





const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminroute);
app.use("/seller",sellerroute);
app.use("/user",userRoute);
app.use('/product',productRoute);
app.use('/voucher',voucherRoute);
app.use('/cart',cartRoute)
app.use('/orders',ordersRoute)
const PORT = 4000;
mongooese
  .connect(
    "mongodb+srv://admin:admin@bookify.pknuqsd.mongodb.net/?retryWrites=true&w=majority&appName=bookify"
  )
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error",error);
  });
