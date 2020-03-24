/* eslint-disable no-console, no-process-exit */
const imdb = require('./imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const METASCORE = 77;

var output1;
var output2;
async function start (actor = DENZEL_IMDB_ID, metascore = METASCORE) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= metascore);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));

    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));

    output1 = JSON.stringify(movies, null, 2);
    output2 = JSON.stringify(awesome, null, 2);

  } catch (e) {
    console.error(e);
  }
}

const [, , id, metascore] = process.argv;

start(id, metascore).then(() => {
require("fs").writeFile(
    "./server/output1.json",

    output1,

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );

require("fs").writeFile(
    "./server/output2.json",

    output2,

    function(err) {
      if (err) {
        console.error("Crap happens");
      }
    }
  );
});

