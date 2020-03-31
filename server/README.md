##How does it work?
(Running the server is explained in the initial page of this project, please check it first if needed).

In this section, we will show you all available endpoints in our index.js:

```javascript
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
  if (limit != null && metascore != null) {
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
```
