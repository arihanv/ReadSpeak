const express = require('express');
const cors = require('cors');
const checkWord = require('check-if-word');
const words = checkWord('en');
const natural = require('natural');
const grammarify = require('grammarify');
const dictionary = require('dictionary-en');
const nspell = require('nspell');

const app = express();
const port = 4000;

app.use(cors());

function cleanSentenceDict(sentence) {
  return new Promise((resolve, reject) => {
    // Load the dictionary
    dictionary((err, dict) => {
      if (err) {
        reject(err);
        return;
      }
      const spellcheck = nspell(dict);
      const validWords = [];
      for (let i = 0; i < sentence.length; i++) {
        if (spellcheck.correct(sentence[i].toLowerCase())) {
          validWords.push(sentence[i]);
        }
      }
      const cleanedSentence = grammarify.clean(validWords.join(' ').replace(/\b(?<![ai])[b-hj-z]\b|\b(?<![a])[a-hj-z]\b|\b(?<!i)[i]\b/gi, ''));
      resolve(cleanedSentence);
    });
  });
}

app.get('/', (req, res) => {
  const query = req.query.q;

  if (!query) {
    res.status(400).send('Missing query parameter');
    return;
  }

  // Split the query into words

  //split into sentences

  const words = query.split(/\W+/);

  console.log(words)

  // Clean the sentence
  cleanSentenceDict(words)
    .then((cleanedSentence) => {
      res.setHeader('Content-Type', 'text/plain');
      res.send(cleanedSentence);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
