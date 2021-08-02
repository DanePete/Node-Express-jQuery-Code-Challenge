console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    $(document).on('click', '#addJokeButton', getInputValues);
    getJokes();
}

/**
 * Get Input Values
 * gets the user input values and build an object to send the to post joke function
 */
function getInputValues() {
    let who = $("#whoseJokeIn").val();
    let question = $("#questionIn").val();
    let punchLine = $("#punchlineIn").val();
    let postObject = {whoseJoke: who, jokeQuestion: question, punchLine: punchLine}
    postJoke(postObject);
    getJokes();
}

/**
 * Get Jokes
 * Retrieves the jokes from the server
 */
function getJokes() {
    $.ajax({
        type: 'GET',
        url: '/getjokes'
      }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let joke = response[i];
            $('#outputDiv ul').append(`
                <li>
                ${joke.whoseJoke} - ${joke.jokeQuestion} - ${joke.punchLine}
                </li>
            `);
        }
      });
}

/**
 * Post Joke
 * posts the new joke object to the server
 */
function postJoke(object) {
    $('ul').empty();
    $.ajax({
        method: 'POST',
        url: '/postjoke',
        data: object
    }).then((response) => {
        console.log('POST /postjoke', response);
        getJokes();
    }).catch((error) => {
        console.log('failed', error);
    });
}

