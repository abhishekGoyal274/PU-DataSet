import M from "materialize-css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Auth/Login.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const RequestForm = () => {
  const navigatee = useNavigate();
  const { dataId } = useParams();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [CollegeName, setCollegeName] = useState("");
  const [UniversityName, setUniversityName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Affiliation, setAffiliation] = useState("");
  const [Position, setPosition] = useState("");
  const [WebsiteLink, setWebsiteLink] = useState("");
  const [CourseEnrolled, setCourseEnrolled] = useState("");
  const [MentorName, setMentorName] = useState("");
  const [MentorUniversity, setMentorUniversity] = useState("");
  const [MentorWebsite, setMentorWebsite] = useState("");
  const [TitleOfWork, setTitleOfWork] = useState("");
  const [Abstract, setAbstract] = useState("");
  const [MentorAffiliation, setMentorAffiliation] = useState("");
  const [SignedFile, setSignedFile] = useState(null);
  const [SignedPdfDownloadLink, setSignedPdfDownloadLink] = useState("");

  useEffect(() => {
    if (SignedPdfDownloadLink) {
      requestHandeler();
      //console.log(SignedPdfDownloadLink)
    }
  }, [SignedPdfDownloadLink]);

  const requestHandeler = () => {
    const data = new FormData();
    data.append("firstName", FirstName);
    data.append("lastName", LastName);
    data.append("email", Email);
    data.append("affiliation", Affiliation);
    data.append("position", Position);
    data.append("websiteLink", WebsiteLink);
    data.append("courseEnrolled", CourseEnrolled);
    data.append("collegeName", CollegeName);
    data.append("universityName", UniversityName);
    data.append("mentorName", MentorName);
    data.append("mentorAffiliation", MentorAffiliation);
    data.append("mentorUniversity", MentorUniversity);
    data.append("mentorWebsiteLink", MentorWebsite);
    data.append("titleOfWork", TitleOfWork);
    data.append("abstract", Abstract);
    data.append("phoneNo", PhoneNo);
    data.append("requestedDataSet", dataId);
    data.append("signedPdfDownloadLink", SignedPdfDownloadLink);

    fetch("http://localhost:5000/auth_request/request_data", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // alert(data.error);
          M.toast({
            html: data.error,
            classes: "#e53935 red darken-1",
          });
        } else {
          // alert(data.message);
          M.toast({
            html: data.message,
            classes: "#1a237e indigo darken-4",
          });
          navigatee("/");
        }
      });
  };
  const handleChangeSignedPdf = (e) => {
    if (e.target.files[0]) {
      setSignedFile(e.target.files[0]);
    }
  };

  const handleUpload = (file, e) => {
    e.preventDefault();
    if (!file) {
      return M.toast({
        html: "PLEASE INPUT ALL FIELD",
        classes: "#1a237e indigo darken-4",
      });
    }
    if (!FirstName || !Email || !PhoneNo || !Abstract || !TitleOfWork) {
      return M.toast({
        html: "PLEASE INPUT ALL FIELD",
        classes: "#1a237e indigo darken-4",
      });
    }

    if (Affiliation && Position && WebsiteLink) {
    } else if (
      CourseEnrolled &&
      UniversityName &&
      MentorName &&
      MentorAffiliation &&
      MentorUniversity &&
      MentorWebsite
    ) {
    } else {
      return M.toast({
        html: "PLEASE FILL FORM PROPERLY",
        classes: "#1a237e indigo darken-4",
      });
    }

    if (
      (Affiliation || Position || WebsiteLink) &&
      (CourseEnrolled ||
        UniversityName ||
        CollegeName ||
        MentorName ||
        MentorAffiliation ||
        MentorUniversity ||
        MentorWebsite)
    ) {
      return M.toast({
        html: "PLEASE FILL FORM PROPERLY",
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
        console.log();
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setSignedPdfDownloadLink(downloadURL);
        });
      }
    );
    console.log("CHECKING");
  };

  return (
    <>
      <div>
        <a href="https://firebasestorage.googleapis.com/v0/b/dic-data-set-react.appspot.com/o/DIC_Data%20Agreement.docx?alt=media&token=055f71a1-baed-42cb-8ee9-2adcfc4f7dd2">
          <button
            style={{
              color: "white",
              border: "2px solid black ",
              background: " MidnightBlue",
              fontSize: "24px",
              margin: "20px",
              cursor: "pointer",
              borderRadius:'20px'
            }}
          >
            {" "}
            Download And Sign This Document and attach with your request
          </button>
        </a>
      </div>
      <div class="form-container">
        <form
          class="register-form form-style-10"
          action="localhost:5000/emailRequest"
          method="POST"
        >
          <h1> Fill the form to request the Dataset</h1>
          <div class="section">
            <span>1</span>Personal Information
          </div>
          <div class="inner-wrap">
            <label>
                Firs Name
              <input
                type="text"
                class="form-field"
                placeholder="FirstName"
                name="firstName"
                value={FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label>
                Last Name
              <input
                type="text"
                class="form-field"
                placeholder="LastName"
                name="lastName"
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
            <label>
                Email
              <input
                type="text"
                class="form-field"
                placeholder="Email"
                name="email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label>
                Phone No.
              <input
                type="number"
                class="form-field"
                placeholder="PhoneNo"
                name="phone"
                value={PhoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              />
            </label>
            <label>
                Title of Work 
              <input
                type="text"
                class="form-field"
                placeholder="TITLE OF WORK"
                name="title"
                value={TitleOfWork}
                onChange={(e) => {
                  setTitleOfWork(e.target.value);
                }}
              />
            </label>
            <label>
                Abstract
              <input
                type="text"
                class="form-field"
                placeholder="ABSTRACT"
                value={Abstract}
                onChange={(e) => {
                  setAbstract(e.target.value);
                }}
              />
            </label>
            <label>
                Signed DOC 
              <input
                type="file"
                class="form-field"
                placeholder="SIGNED DOC"
                name="firstName"
                onChange={handleChangeSignedPdf}
              />
            </label>
          </div>
          {/* section 2 */}
          <div class="section">
            <span>2</span>IF FACULTY/RESERACHER :
          </div>
          <div class="inner-wrap">
            <label>
                Affiliation
              <input
                type="text"
                class="form-field"
                placeholder="AFFILIATION"
                name="firstName"
                value={Affiliation}
                onChange={(e) => {
                  setAffiliation(e.target.value);
                }}
              />
            </label>
            <label>
                Position
              <input
                type="text"
                class="form-field"
                placeholder="POSITION"
                name="firstName"
                value={Position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
            </label>
            <label>
                Website Link
              <input
                type="text"
                class="form-field"
                placeholder="WEBSITE LINK"
                name="firstName"
                value={WebsiteLink}
                onChange={(e) => {
                  setWebsiteLink(e.target.value);
                }}
              />
            </label>
          </div>

          {/* section 3 */}
          <div class="section">
            <span>3</span> IF STUDENT:
          </div>
          <div class="inner-wrap">
            <input
              type="text"
              class="form-field"
              name="courseEnrolled"
              placeholder="COURSE ENROLLED"
              value={CourseEnrolled}
              onChange={(e) => {
                setCourseEnrolled(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              name="collegeName"
              placeholder="CollegeName"
              value={CollegeName}
              onChange={(e) => {
                setCollegeName(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              placeholder="UniversityName"
              name="universityName"
              value={UniversityName}
              onChange={(e) => {
                setUniversityName(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              placeholder="MENTOR NAME"
              name="mentorName"
              value={MentorName}
              onChange={(e) => {
                setMentorName(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              placeholder="MENTOR AFFILIATION"
              value={MentorAffiliation}
              onChange={(e) => {
                setMentorAffiliation(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              placeholder="MENTOR UNIVERSITY"
              value={MentorUniversity}
              onChange={(e) => {
                setMentorUniversity(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-field"
              placeholder="MENTOR WEBSITE LINK"
              value={MentorWebsite}
              onChange={(e) => {
                setMentorWebsite(e.target.value);
              }}
            />
          </div>
          <div class="button-section">
            <button
              class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
              onClick={(event) => {
                handleUpload(SignedFile, event);
              }}
            >
              REQUEST
            </button>
            <span class="privacy-policy">
              <input type="checkbox" name="field7" />
              You agree to our Terms and Policy.
            </span>
          </div>
          {/* ------------------------------------------- */}
        </form>
      </div>
    </>
  );
};

export default RequestForm;
