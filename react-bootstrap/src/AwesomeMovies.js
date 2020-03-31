import React from "react";
import "./GradientBorder.css";
const axios = require("axios");

var json_data;
async function get_movies() {
  var response = await axios.get("http://localhost:9292/movies");
  json_data = response.data;
  console.log(JSON.stringify(json_data));
}

var data_test = [
  {
    _id: "",
    link: "",
    metascore: 0,
    poster: "",
    rating: 0,
    synopsis: "",
    title: "",
    votes: 0,
    year: 0
  }
];

export class AwesomeMovies extends React.Component {
  constructor(props) {
    super(props);
    (async () => {
      await get_movies();
      console.log("Data: " + json_data);
      this.forceUpdate();
    })();
  }
  render() {
    if (json_data != null) {
      console.log("Data found !");
      return (
        <div>
          <h2>Don't worry, they're all awesome !</h2>
          {json_data.map((data_details, index) => {
            return (
              <div className="gradient-border">
                <img src={data_details.poster} alt="new" />
                <p>
                  <b>Id: </b>
                  {data_details._id}
                </p>
                <p>
                  <b>Link: </b>
                  {data_details.link}
                </p>
                <p>
                  <b>Metascore: </b>
                  {data_details.metascore}
                </p>
                <p>
                  <b>Rating: </b>
                  {data_details.rating}
                </p>
                <p>
                  <b>Synopsis: </b>
                  {data_details.synospsis}
                </p>
                <p>
                  <b>Title: </b>
                  {data_details.title}
                </p>
                <p>
                  <b>Votes: </b>
                  {data_details.votes}
                </p>
                <p>
                  <b>Year: </b>
                  {data_details.year}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <h2>
          Loading your future must-see and favorites, please wait a few
          seconds...
        </h2>
        {data_test.map((data_details, index) => {
          return (
            <div className="gradient-border">
              <img src={data_details.poster} alt="new" />
              <p>
                <b>Id: </b>
                {data_details._id}
              </p>
              <p>
                <b>Link: </b>
                {data_details.link}
              </p>
              <p>
                <b>Metascore: </b>
                {data_details.metascore}
              </p>
              <p>
                <b>Rating: </b>
                {data_details.rating}
              </p>
              <p>
                <b>Synopsis: </b>
                {data_details.synospsis}
              </p>
              <p>
                <b>Title: </b>
                {data_details.title}
              </p>
              <p>
                <b>Votes: </b>
                {data_details.votes}
              </p>
              <p>
                <b>Year: </b>
                {data_details.year}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
