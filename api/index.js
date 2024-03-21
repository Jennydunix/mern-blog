import express from "express";

// create your application
const app = express();

// Listen to a port
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
