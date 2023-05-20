import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const DataSet = () => {
  const [DataSet, setDataSet] = useState(null);
  const { dataId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/auth_request/get_data_set/${dataId}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDataSet(result.data_set);
      });
  }, []);
  // const history = useHistory();
  // function handleClick() {
  //   history.push("/requestform");
  // }
  return (
    <div>
      {DataSet ? (
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "44px",
              fontFamily: "Georgia",
            }}
          >
            {DataSet.Data_name}{" "}
          </h1>
          
          <div class="row">
            <div class="col s12 m6">
              <div
                class="card blue-white darken-1 z-depth-2 boxEffect"
                style={{ border: "2px solid midnightblue" }}
              >
                <div class="card-content black-text">
                  <span class="card-title indigo-text">SAMPLE</span>
                  <p>
                    Sample dataset is available! Click here to download sample
                    dataset.{" "}
                  </p>
                </div>
                <div class="card-action center-align">
                  {/* <a href="#">This is a link</a> */}
                  <a href={DataSet.sampleDataSet}>
                    <button
                      class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-3 z-depth-1 "
                      style={{
                        backgroundColor: "#283593",
                        borderRadius: "18px",
                      }}
                    >
                      {" "}
                      Download Sample
                    </button>
                  </a>
                  {/* <a href="#">This is a link</a> */}
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div
                class="card blue-white darken-1 z-depth-2 boxEffect"
                style={{ border: "2px solid midnightblue" }}
              >
                <div class="card-content black-text">
                  <span class="card-title indigo-text">FULL DATASET</span>
                  <p>
                    To request the full dataset, fill the dataset request form.{" "}
                  </p>
                </div>
                <div class="card-action center-align">
                  <Link to={`/request_data_set/${dataId}`}>
                    <a>
                      {" "}
                      <button
                        class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-3  z-depth-1"
                        style={{
                          backgroundColor: "#283593",
                          borderRadius: "18px",
                        }}
                      >
                        {" "}
                        FULL DATASET : REQUEST DATA SET
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <table
            class="table table-striped-columns"
            style={{ margin: "0 20px" }}
          >
            <tr>
              <td>
                <h5>Contents</h5>
              </td>
              <td>{DataSet.Description}</td>
            </tr>
            <tr>
              <td>
                <h5>Size</h5>
              </td>
              <td>This dataset contains 100 rows and 5 columns.</td>
            </tr>
            <tr>
              <td>
                <h5>Owner</h5>
              </td>
              <td>{DataSet.Owner.name}</td>
            </tr>
            <tr>
              <td>
                <h5>Citation Policy</h5>
              </td>
              <td>This is the citation policy.</td>
            </tr>
          </table>
        </div>
      ) : (
        <h2>loading..</h2>
      )}
    </div>
  );
};

export default DataSet;
