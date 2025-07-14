import express from "express";

const app = express();

app.use("/", (req, res) => res.send("Namaste from devTinder 🙏"));

app.listen(7777, () => {
  console.log("App is running on the port 7777...");
});
