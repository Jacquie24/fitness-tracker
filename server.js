const express = require("express");
// const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080

const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
