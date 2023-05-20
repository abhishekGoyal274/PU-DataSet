import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../Auth/Login.css";
import M from "materialize-css";
const UploadDataSet = () => {
  const navigatee = useNavigate();
  const [Name, setName] = useState("");
  const [FullName, setFullName] = useState("");
  const [HomePageURL, setHomePageURL] = useState("");
  const [PaperName, setPaperName] = useState("");
  const [Introduction_Date, setIntroduction_Date] = useState("");
  const [License, setLicense] = useState("");
  const [URLLicenseTerms, setURLLicenseTerms] = useState("");
  const [Modality, setModality] = useState("");
  const [Language, setLanguage] = useState("");
  const [Tasks, setTasks] = useState("");

  const [DataName, setDataName] = useState("");
  const [Description, setDescription] = useState("");
  const [File, setFile] = useState(null);
  const [SampleFile, setSampleFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [DownloadUrl, setDownloadUrl] = useState(null);
  const [SampleDownloadUrl, setSampleDownloadUrl] = useState(null);

  useEffect(() => {
    if (DownloadUrl && SampleDownloadUrl) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("EK HI BAAR UPLOAD HO RHA HA");
      const data = new FormData();
      data.append("Name", Name);
      data.append("FullName", FullName);
      data.append("Data_name", DataName);
      data.append("Description", Description);
      data.append("HomePage_Url", HomePageURL);
      data.append("PaperName", PaperName);
      data.append("Introduction_Date", new Date(Introduction_Date));
      data.append("DataSet_Licence", License);
      data.append("Url_To_Full_Licence", URLLicenseTerms);
      data.append("Modalities", Modality);
      data.append("Languages", Language);
      data.append("Tasks", Tasks);
      data.append("downloadLink", DownloadUrl);
      data.append("sampleDataSet", SampleDownloadUrl);
      data.append("userId", user._id);
      data.append("email", user.email);
      try {
        // console.log("IN THE TRY BLOCK");

        fetch("http://localhost:5000/data/upload_data-set", {
          method: "POST",
          body: data,
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              // alert(data.error);
              M.toast({
                html: data.error,
                classes: "#f44336 red",
              });
            } else {
              M.toast({
                html: data.message,
                classes: "#1a237e indigo darken-4",
              });
              navigatee("/");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [DownloadUrl, SampleDownloadUrl]);

  const handleChangeDataSet = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleChangeSampleDataSet = (e) => {
    if (e.target.files[0]) {
      setSampleFile(e.target.files[0]);
    }
  };

  const handleUpload = (file, sampleFile, e) => {
    e.preventDefault();
    if (!file || !sampleFile) {
      return M.toast({
        html: "PLEASE INPUT ALL FIELD",
        classes: "#1a237e indigo darken-4",
      });
    }
    if (!DataName || !Description) {
      return M.toast({
        html: "PLEASE INPUT ALL FIELD",
        classes: "#1a237e indigo darken-4",
      });
    }
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDownloadUrl(downloadURL);
        });
      }
    );

    console.log("SECOND FILE BHI UPLOAD HO RHA HAI");
    const sotrageRef2 = ref(storage, `files/${sampleFile.name}`);
    const uploadTask2 = uploadBytesResumable(sotrageRef2, sampleFile);

    uploadTask2.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
          console.log("Sample File available at", downloadURL);
          setSampleDownloadUrl(downloadURL);
        });
      }
    );
  };
  return (
    <>

      {/* ---------------------------------------------------------- */}
      <div class="form-container">
        
        <form class="register-form form-style-10">
          <h1>Fill the form to Upload a Dataset.</h1>
          {/* Section 1 */}
          <div class="section">
            <span>1</span>Personal Info
          </div>
          <div class="inner-wrap">
            <label>
              Name
              <input
                type="text"
                name="field1"
                class="form-field"
                placeholder="NAME"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              Full Name (opt)
              <input
                type="text"
                name="field1"
                class="form-field"
                placeholder="FULL NAME (OPTIONAL)"
                value={FullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </label>
          </div>
          {/* Section 2 */}
          <div class="section">
            <span>2</span>Dataset Details
          </div>
          <div class="inner-wrap">
            <label>
              DataSet Name
              <input
                type="text"
                class="form-field"
                placeholder="DATASET NAME"
                value={DataName}
                onChange={(e) => {
                  setDataName(e.target.value);
                }}
              />
            </label>
            <label>
              HOMEPAGE URL (OPTIONAL)
              <input
                type="text"
                class="form-field"
                placeholder="HOMEPAGE URL (OPTIONAL)"
                value={HomePageURL}
                onChange={(e) => {
                  setHomePageURL(e.target.value);
                }}
              />
            </label>
            <label>
              Description
              <textarea
                name="field2"
                class="form-field"
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </label>
            <label>
              Paper Name
              <input
                type="text"
                class="form-field"
                placeholder="PAPER WHERE THE DATASET WAS INTRODUCED"
                value={PaperName}
                onChange={(e) => {
                  setPaperName(e.target.value);
                }}
              />
            </label>
            <label>
              Intro Date
              <input
                type="date"
                class="form-field"
                placeholder="INTRODUCTION DATE"
                value={Introduction_Date}
                onChange={(e) => {
                  setIntroduction_Date(e.target.value);
                }}
              />
            </label>
            <label>
              Dataset Licence
              <input
                type="text"
                class="form-field"
                placeholder="DATASET LICENSE"
                value={License}
                onChange={(e) => {
                  setLicense(e.target.value);
                }}
              />
            </label>{" "}
            <label>
              URL TO FULL LICENSE TERMS
              <input
                type="text"
                class="form-field"
                placeholder="URL TO FULL LICENSE TERMS"
                value={URLLicenseTerms}
                onChange={(e) => {
                  setURLLicenseTerms(e.target.value);
                }}
              />
            </label>
            <label>
              ADD MODALITIES
              <input
                type="text"
                class="form-field"
                placeholder="ADD MODALITIES"
                value={Modality}
                onChange={(e) => {
                  setModality(e.target.value);
                }}
              />
            </label>
            <label>
              ADD LANGUAGES
              <input
                type="text"
                class="form-field"
                placeholder="ADD LANGUAGES"
                value={Language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              />
            </label>
            <label>
              ADD TASKS
              <input
                type="text"
                class="form-field"
                placeholder="ADD TASKS"
                value={Tasks}
                onChange={(e) => {
                  setTasks(e.target.value);
                }}
              />
            </label>
          </div>
          {/* Section 3 */}
          <div class="section">
            <span>3</span>Datasets File
          </div>
          <div class="inner-wrap">
            <label>
              DATA SET :{" "}
              {
                <input
                  type="file"
                  class="form-field"
                  onChange={handleChangeDataSet}
                />
              }
            </label>
            <label>
              SAMPLE DATA SET :{" "}
              {
                <input
                  type="file"
                  class="form-field"
                  onChange={handleChangeSampleDataSet}
                />
              }
            </label>
          </div>
          {/* ------------------------------------ */}

          
          
          <br></br>
          <br></br>
          <div class="button-section">
          <button
            class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
            onClick={(event) => {
              handleUpload(File, SampleFile, event);
            }}
          >
            ADD DATASET
          </button>
            <span class="privacy-policy">
              <input type="checkbox" name="field7" />
              You agree to our Terms and Policy.
            </span>
          </div>
        </form>

      </div>
    </>
  );
};

export default UploadDataSet;
