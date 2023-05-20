import React, { useState, useEffect } from "react";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import * as ReactBootStrap from "react-bootstrap";

const Home = () => {
  const [DataSets, setDataSets] = useState([]);
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  useEffect(() => {
    fetch("http://localhost:5000/auth_request/get_all_data_set")
      .then(
        (res) => res.json()
        // .catch(e.console.log(error))
      )

      .then((result) => {
        console.log(result);
        console.log(result.data_sets);
        setDataSets(result.data_sets);
        console.log(DataSets);
      });
  }, []);

  function onLoadMore(event) {
    skip = skip + limit;
    console.log("Load");
  }

  function convertDate(inputFormat) {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var now = new Date(inputFormat);
    return (
      days[now.getDay()] +
      " " +
      months[now.getMonth()] +
      " " +
      now.getDate() +
      " " +
      now.getFullYear()
    );
  }
  const renderPlayer = (player, index) => {
    var i = index % 4;
    var img = "./" + i + ".jpg";
    return (
      <div class="col">
        <div class="card boxEffect">
          <div class="card-body">
            <h5>

              <img
                class="card-img-top"
                src={img}
                style={{ height: "80px", width: "80px" }}
                alt="Card cap"
              ></img>
              &nbsp;&nbsp;
              <b>{player.Data_name}</b>
            </h5>
            <p
              style={{
                width: "35ch",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {player.Description}
            </p>
            <p class="card-text">{convertDate(player.Date)}</p>
            <Link
              to={`/dataSet/${player._id}`}
              class="btn btn-primary"
              style={{ backgroundColor: "#283593", borderRadius: "18px" }}
            >
              More
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* <ul> */}
      <React.Fragment>
        {/* <li key={item._id}>
              <Link to={`/dataSet/${item._id}`}>{item.Data_name}</Link> </li> */}
        <h1
          class="flow-text"
          style={{
            fontSize: "64px",
            textAlign: "center",
            fontFamily: "Georgia",
          }}
        >
          PU DATASETS
        </h1>
        <div
          class="row row-cols-1 row-cols-md-2 g-4"
          style={{ padding: "20px" }}
        >
          {DataSets.map(renderPlayer)}
        </div>
        <button onClick={onLoadMore}>Load More</button>
      </React.Fragment>
    </div>
  );
};

export default Home;
