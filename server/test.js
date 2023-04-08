const express = require("express");
const cors = require("cors");
const checkWord = require("check-if-word");
// const words = checkWord('en');
const natural = require("natural");
const grammarify = require("grammarify");
const dictionary = require("dictionary-en");
const nspell = require("nspell");
const isPunctuation = require("is-punctuation");
const clean = require("clean-text");

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
      const cleanedSentence = grammarify.clean(
        validWords
          .join(" ")
          .replace(
            /\b(?<![aA])(?<![iI])[b-hj-z]\b|\b(?<![aA])[a-hj-z]\b|\b(?<![iI])[i]\b/gi,
            ""
          )
      );

      resolve(cleanedSentence);
    });
  });
}

function cleanWord(sentence) {
  return new Promise((resolve, reject) => {
    const allMatches = sentence.match(/(\b\w+\b|“|”|,|[^\w\s]|\s+)/g);

    console.log("All Matches:", allMatches);
    // Load the dictionary
    dictionary((err, dict) => {
      if (err) {
        reject(err);
        return;
      }
      const spellcheck = nspell(dict);

      const validWords = [];
      for (let i = 0; i < allMatches.length; i++) {
        if (allMatches[i].length === 1) {
          if (
            allMatches[i] === "i" ||
            allMatches[i] === "'" ||
            allMatches[i] == "’" ||
            allMatches[i] == "s" ||
            allMatches[i] === "I" ||
            allMatches[i] === "a" ||
            allMatches[i] === "A" ||
            allMatches[i] === " " ||
            allMatches[i] === "." ||
            allMatches[i] === "," ||
            allMatches[i] === "'" ||
            allMatches[i] === '"' ||
            allMatches[i] === ";" ||
            allMatches[i] === ":" ||
            allMatches[i] === "(" ||
            allMatches[i] == '"' ||
            allMatches[i] == " " ||
            allMatches[i] == "“" ||
            allMatches[i] === ")" ||
            allMatches[i] === "?" ||
            allMatches[i] === "!"
          ) {
            validWords.push(allMatches[i]);
          }
        } else if (spellcheck.correct(allMatches[i].toLowerCase())) {
          console.log(allMatches[i] + " is correct");
          validWords.push(allMatches[i]);
        }
      }

      resolve(grammarify.clean(validWords.join("")));
    });
  });
}

query =
  "ﬁ The Trap and the Doves A flock of doves was flying in search of grains. After flying for miles, they saw grains under a tree. They immediately flew down and started eating the grains. But it was a trap set by a hunter. The doves were trapped in the hunter’s net. But their leader cried, “We must not lose courage. Let us ik . T— fly together along with this net.” So, to the hunter’s W T utter amazement, the doves rose high with the ;g A net. After flying some distance, the leader 4 said, “My friend, the king of rats, will help oG g - go°  us. Let us go to him” So, they flew to i P a' % ‘A Where the rats lived. When the rat king F i > > saw them, he was surprised. The A 7 4 ,? leader of the doves told him a RN ) ! | J everything. The king rat immediately ) k. = bit the net with his teeth and freed ~ ' » f ' the doves. The dove leader and the L é ’ ‘ rat king hugged each other. The R ‘% ‘ . doves thanked the rat king.";

cleanWord(query.normalize("NFKC"))
  .then((word) => {
    console.log(grammarify.clean(clean(word)));
  })
  .catch((err) => {
    console.error(err);
  });
