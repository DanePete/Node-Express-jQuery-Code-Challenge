const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = 5000;

// Get Response from client

// This must be added before GET & POST routes.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

let jokes = [
  {
    whoseJoke: "Danny",
    jokeQuestion: "Why do scuba divers fall backwards out of boats?",
    punchLine: "If they fell forwards they’d still be in the boat!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Two fish are in a tank. What did one fish say to the other?",
    punchLine: "Do you know how to drive this thing?"
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs!"
  },
  {
    whoseJoke: "Scott",
    jokeQuestion: "I went to the zoo the other day, it had one dog...",
    punchLine: "It was a shih tzu."
  }
];

/**
 * Server Side Post Joke
 * Gets the new joke and pushes it in the the jokes array
 */
app.post('/postjoke', function(request, response) {
  let joke = request.body;
  console.log('server joke response', joke);
  console.log('got here');
  jokes.push(joke);
  //console.log('jokes after array oush', jokes);
  console.log('jokes in server', jokes);
});

/**
 * Get Jokes
 * Sends the jokes array back to the client
 */
app.get('/getjokes', function(request, response) {
  response.send(jokes);
});

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); // end spin up server
