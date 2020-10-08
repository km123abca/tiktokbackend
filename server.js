import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
// const express = require("express");
// const mongoose = require("mongoose");
// const data = require("./data");
const tiktokVideos = require("./dbModel");

const port = 9000;

const app = express();
app.use(express.json());

//DBConfig
const connection_url =
  "mongodb+srv://admin:sonja@cluster0.nlimi.mongodb.net/tiktok?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//########################################

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next(); //so that the flow may continue
});

//################################################
/* or */
/*
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next();
});*/
app.get("/", (req, res) => res.status(200).send("hello world"));
app.get("/v1/posts", (req, res) => res.status(200).send(data));
app.get("/v2/posts", (req, res) => {
  tiktokVideos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  tiktokVideos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.listen(port, () => console.log(`listening on localhost:${port}`));
