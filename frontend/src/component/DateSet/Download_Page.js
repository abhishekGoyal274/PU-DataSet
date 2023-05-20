import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Download_Page = () => {
  const navigatee = useNavigate();
  const { userId } = useParams();
  //const [DownloadLink, setDownloadLink] = useState("");
  const [Fetched_data_set, setFetched_data_set] = useState();

  useEffect(() => {
    const data = new FormData();
    data.append("UserId", userId);
    fetch(`http://localhost:5000/auth_request/data_set/download`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          alert(result.error);
          // navigatee("/");
        } else {
          setFetched_data_set(result.data_set);
          //setDownloadLink(result.data_set.downloadLink);
        }
      });
  }, []);

  const onClickHandeler = () => {
    const data = new FormData();
    data.append("userId", userId);
    fetch(`http://localhost:5000/auth_request/delete_user`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigatee("/");
      });
  };

  return (
    <div>
      {Fetched_data_set ? (
        <React.Fragment>
           <h1
            style={{
              textAlign: "center",
              fontSize: "44px",
              fontFamily: "Georgia",
            }}
          >
            {Fetched_data_set.Data_name}{" "}
          </h1>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                border: "2px solid MidnightBlue",
                width: "650px",
                padding: "20px",
                margin: "20px",
              }}
            >
              <p
                style={{
                  marginLeft: "20px",
                  fontFamily: "Georgia",
                  fontSize: "24px",
                }}
              >
                {" "}
                To Download a sample of this dataset click the link{" "}
              </p>
              <a href={Fetched_data_set.sampleDataSet}>
                <button
                  style={{
                    color: "white",
                    border: "2px solid black ",
                    background: " MidnightBlue",
                    fontSize: "24px",
                    margin: "20px",
                    cursor:"pointer",
                  }}
                >
                  {" "}
                  Download Sample
                </button>
              </a>
            </div>
            <div
              style={{
                border: "2px solid MidnightBlue",
                width: "650px",
                padding: "20px",
                margin: "20px",
              }}
            >
              <p
                style={{
                  marginLeft: "20px",
                  fontFamily: "Georgia",
                  fontSize: "24px",
                }}
              >
                {" "}
                To Download the full dataset click the link and fill the Dataset
                Request form{" "}
              </p>
              <button
                // style={{
                //   width: "500px",
                //   color: "white",
                //   border: "2px solid black ",
                //   background: " MidnightBlue",
                //   fontSize: "24px",
                //   margin: "20px",
                // }}
              >
                {/* {" "}
                FULL DATASET :{" "} */}
                <div >
          <a href={Fetched_data_set.downloadLink}>
            <button style={{background:'midnightblue',width:'500px',color:'white',border:'2px solid black',fontSize:'24px'}}
              onClick={() => {
                onClickHandeler();
              }}
            >
              DOWNLOAD
            </button>
          </a>
        </div>
                {/* <Link to={`/request_data_set/${dataId}`}>
                  <p style={{ color: "white", width: "500px" }}>
                    REQUEST DATA SET
                  </p>
                </Link> */}
              </button>
            </div>
          </div>
          <div style={{ margin: "20px" }}>
            <h1 style={{fontSize:'48px'}}>Contents</h1>
            {/* <br></br> */}
            <p>{Fetched_data_set.Description}</p>
          </div>
          <div style={{ margin: "20px" }}>
            <h1 style={{fontSize:'48px'}}>Size </h1>
            {/* <br></br> */}
            <p>This dataset contains 100 rows and 5 columns.</p>
          </div>
          <div style={{ margin: "20px" }}>
            <h1 style={{fontSize:'48px'}}>Owner </h1>
            {/* <br></br> */}
            <p>{Fetched_data_set.Owner.name} </p>
          </div>
          <div style={{ margin: "20px" }}>
            <h1 style={{fontSize:'48px'}}>Citation Policy </h1>
            {/* <br></br> */}
            <p>This is the citation policy.</p>
          </div>

        {/* <div style={{ alignItems: "center" }}>
          <a href={Fetched_data_set.downloadLink}>
            <button
              onClick={() => {
                onClickHandeler();
              }}
            >
              DOWNLOAD
            </button>
          </a>
        </div> */}
        </React.Fragment>
      ) : (
        <h2>FETCHING...</h2>
      )}
    </div>
  );
};

export default Download_Page;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Download_Page = () => {
//   const navigatee = useNavigate();
//   const { userId } = useParams();
//   const [DownloadLink, setDownloadLink] = useState("");

//   useEffect(() => {
//     const data = new FormData();
//     data.append("UserId", userId);
//     fetch(`http://localhost:5000/auth_request/data_set/download`, {
//       method: "POST",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         if (result.error) {
//           alert(result.error);
//           // navigatee("/");
//         } else {
//           setDownloadLink(result.downloadLink);
//         }
//       });
//   }, []);

//   const onClickHandeler = () => {
//     const data = new FormData();
//     data.append("userId", userId);
//     fetch(`http://localhost:5000/auth_request/delete_user`, {
//       method: "POST",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         navigatee("/");
//       });
//   };

//   return (
//     <div>
//       {DownloadLink ? (
//         <div style={{ alignItems: "center" }}>
//           <a href={DownloadLink}>
//             <button
//               onClick={() => {
//                 onClickHandeler();
//               }}
//             >
//               DOWNLOAD
//             </button>
//           </a>
//         </div>
//       ) : (
//         <h2>FETCHING</h2>
//       )}
//     </div>
//   );
// };

// export default Download_Page;
