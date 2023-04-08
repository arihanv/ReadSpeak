import { FlashcardArray } from "react-quizlet-flashcard";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../css/Cards.css";
import nlp from "compromise";
import speechPlugin from "compromise-speech";
import {motion} from 'framer-motion'
import { Popover, OverlayTrigger } from "react-bootstrap";
nlp.plugin(speechPlugin);


export default function Cards(props) {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [flippedStates, setFlippedStates] = useState(
    Array(props.words.length).fill(false)
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  function flip() {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
    setFlipped(!flipped);
    console.log("Flipped", newFlippedStates[index]);
  }

  function change(ind) {
    setFlipped(false);
    setIndex(ind);
    setHighlightedIndex(-1);
    console.log("current", index);
    console.log("change");
    console.log(flippedStates[ind]);
  }

  const speakWord = (word) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.55;
    synth.speak(utterance);
    const words = word.split(" ");
    words.forEach((w, i) => {
      setTimeout(() => {
        setHighlightedIndex(i);
      }, i * 600);
    });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    if (flippedStates[index] == true) {
      speakWord(props.words[index]);
      console.log("speak");
    }
  }, [flipped, index]);

  const cards = props.words.map((word, index) => ({
    id: index,
    frontHTML: (
      <div className="cardCont">
        <div className="cardWord">{word}</div>
      </div>
    ),
    backHTML: (
      <div className="cardCont backCard" style={{ whiteSpace: "pre-wrap" }}>
        {word.split(" ").map((w, i) => (
          <div className="backwordCont">
             <OverlayTrigger trigger="hover" placement="top" overlay={
            <Popover id={`popover-positioned-`}>
              <Popover.Header as="h3">{`Popover `}</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          }>
            <span
              key={i}
              className={highlightedIndex === i ? "highlighted" : ""}
            >
             
              {w}
            </span></OverlayTrigger>{" "}
            {/* <div className="syllableTitle">Syllables</div> */}
            <motion.div whileHover={{scale:1.2}} className="syllableCont">
              {nlp(w)
                .terms()
                .syllables()[0]
                .map((syllable, index, array) => (
                  <span key={index}>
                    {syllable}
                    {index < array.length - 1 ? "-" : ""}
                  </span>
                ))}{" "}
              {console.log(nlp(w).terms().syllables()[0])}
            </motion.div>
          </div>
        ))}
      </div>
    ),
    flipped: false,
  }));

  return (
    <div className="storyContainer">
      <FlashcardArray
        onCardChange={(index) => change(index)}
        onCardFlip={() => flip()}
        cards={cards}
      />
    </div>
  );
}
