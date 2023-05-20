const Data_set = require("../models/Data_Set");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const User = require("../models/User_upload");
const mongoose = require("mongoose");

const uploadData = async (req, res, next) => {
  /* console.log(req.body);
  return res.send("WAIT");*/

  const {
    Name,
    Data_name,
    Description,
    PaperName,
    Introduction_Date,
    DataSet_Licence,
    Url_To_Full_Licence,
    Modalities,
    Languages,
    Tasks,
    downloadLink,
    sampleDataSet,
    userId,
    email,
  } = req.body;

  // console.log(req.body)

  if (
    !Name ||
    !Data_name ||
    !Description ||
    !PaperName ||
    !Introduction_Date ||
    !DataSet_Licence ||
    !Url_To_Full_Licence ||
    !Modalities ||
    !Languages ||
    !Tasks ||
    !downloadLink ||
    !sampleDataSet ||
    !userId ||
    !email
  ) {
    const error = new HttpError("PLEASE FILL ALL FIELD", 401);
    return next(error);
  }

  let data_set;

  try {
    data_set = await Data_set.create({
      Name,
      FullName: req.body.FullName ? req.body.FullName : "",
      Owner: userId,
      Email: email,
      Data_name,
      HomePage_Url: req.body.HomePage_Url ? req.body.HomePage_Url : "",
      Description,
      PaperName,
      Introduction_Date,
      DataSet_Licence,
      Url_To_Full_Licence,
      Modalities,
      Languages,
      Tasks,
      downloadLink,
      sampleDataSet,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("UPLOADING DATA FAILED", 500);
    return next(error);
  }

  let owner;
  try {
    //  owner = await User.findById(userId);
    owner = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { data_sets: data_set._id } }
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("UPLOADING DATA FAILED", 500);
    return next(error);
  }

  res.status(201).json({
    message: "DATA UPLOADED SUCCESSFULLY",
  });
};

const search_data_set = async (req, res, next) => {
  router.post("/search-users", (req, res) => {
    let userPattern = new RegExp("^" + req.body.query);
    User.find({ email: { $regex: userPattern } })
      .select("_id email")
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.uploadData = uploadData;
exports.search_data_set = search_data_set;
