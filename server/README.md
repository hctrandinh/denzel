##How does it work?
(Running the server is explained in the initial page of this project, please check it first if needed).

In this section, we will show you all available endpoints in our index.js:

```javascript
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { PORT } = require("./constants");
const imdb = require("./imdb");
const { MongoClient } = require("mongodb");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const uri =
  "mongodb+srv://dbUser:dbUser@cluster0-yyq1x.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

module.exports = app;

app.use(require("body-parser").json());
app.use(cors());
app.use(helmet());

app.options("*", cors());

app.get("/", (request, response) => {
  response.send({ ack: true });
});

app.get("/movies/populate/:id", function(request, response, next) {
  var id = request.params.id;
  imdb(id).then(result => {
    response.send({ total: result.length });
  });
});

app.get("/movies", (request, response) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(async () => {
    const collection = client.db("denzel").collection("movies");
    const movies = await collection.find().toArray();
    const awesome_movies = movies.filter(movie => movie.metascore >= 70);
    response.send(awesome_movies);
  });
});

app.get("/movies/:id", function(request, response) {
  var id = request.params.id;
  var limit = parseInt(request.query.limit);
  var metascore = parseInt(request.query.metascore);
  console.log("Limit: " + limit);
  console.log("Metascore: " + metascore);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  if (limit >= 0 && metascore >= 0) {
    console.log("Searching those ones !");
    client.connect(async () => {
      const collection = client.db("denzel").collection("movies");
      const movies = await collection
        .find({
          metascore: { $gte: metascore }
        })
        .limit(limit)
        .toArray();
      response.send(movies);
    });
  } else {
    client.connect(async () => {
      console.log("Searching this one !");
      const collection = client.db("denzel").collection("movies");
      const movie = await collection.findOne({ _id: id });
      response.send(movie);
    });
  }
});

app.get("/random", function(request, response) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(async () => {
    const collection = client.db("denzel").collection("movies");
    const all_movies = await collection.find({}).toArray();
    const options = {
      skip: getRandomInt(all_movies.length)
    };
    const movie = await collection.findOne({}, options);
    response.send({ movies_qt: all_movies.length, your_movie: movie });
  });
});

app.post("/movies/:id", function(request, response) {
  var id = request.params.id;
  var { date, review } = request.body;
  console.log("Date: " + date);
  console.log("Review: " + review);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(async () => {
    const collection = client.db("denzel").collection("movies");
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: { reviews: { date, review } } }
    );
    response.send(result);
  });
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
```

## Get

### /

To check if the server is up !
![image](./assets/img1.png)

### /movies/populate/:id

Search your favorite actor id on imdb to replace the current movies inside the db and display those you want.
It's updated on Mongodb Atlas using this method:

```javascript
const uri =
  "mongodb+srv://dbUser:dbUser@cluster0-yyq1x.mongodb.net/test?retryWrites=true&w=majority";

const save_movies_to_db = async movies_to_add => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err);
      const collection = client.db("denzel").collection("movies");
      collection.deleteMany({}, () => {
        collection.insertMany(movies_to_add, () => {
          client.close();
          resolve();
        });
      });
    });
  });
};
```

### /movies

Fetch those awesome movies only !
![image](./assets/img2.png)

### /movies/random

Fetch a random movie !
![image](./assets/img5.png)

Fetch a specific number of movies and with a minimum metascore value !
![image](./assets/img4.png)

### /movies/random

Fetch a random movie !
![image](./assets/img5.png)

## Post

### /movies/random

Post a review for your movie !
![image](./assets/img6.png)
