const express = require("express");
const mongooese = require("mongoose");
const cors = require("cors");
const adminroute = require("./router/admin.router");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminroute);

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
