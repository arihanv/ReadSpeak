import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import React, { useState, useEffect, useRef } from "react";
import { dictionary } from "cmu-pronouncing-dictionary";
import "../css/App.css";
import { addWord } from "../actions/index.js";
import { useSelector, useDispatch } from "react-redux";
import handleCompareClick from "../modules/phonetic";
import { Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import ValidateAnimate from "../modules/ValidateAnimate";
import Form from "react-bootstrap/Form";
import "../css/fonts.css";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import exampleText from '../text/stories_grouped.json';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function App() {
  
  const randomIndex = Math.floor(Math.random() * exampleText.length);
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const [sentence, setSentence] = useState(
    exampleText[randomIndex][randomIndex]
  );
  console.log(exampleText[randomIndex][randomIndex]);
  const [fontSize, setFontSize] = useState(30);
  const [isCorrect, setIsCorrect] = useState(null);
  const [lastWord, setLastWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  var words = sentence.trim().split(" ");
  const [currentWord, setCurrentWord] = useState(words[currentIndex]);
  const [hardWords, setHardWords] = useState([]);
  const [counter, setCounter] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isStop, setIsStop] = useState(true);
  const wordsRedux = useSelector((state) => state);
  const [font, setFont] = useState("roboto");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isStopRef = useRef(true);

  const [inputText, setInputText] = useState("");

  const resultsRef = useRef(null);

  useEffect(() => {
    handleListen();
    setLastWord("");
    // setCurrentIndex(0);
  }, [isListening]);

  // useEffect(() => {
    
  // }, [generateSent]);

  const generateSent = () => {
    const randomIndex = Math.floor(Math.random() * exampleText.length);
    setSentence(exampleText[randomIndex][randomIndex]);
  };  

  const handleListen = () => {
    try {
      if (isListening && !mic.listening) {
        // check if recognition is already running
        mic.start();
        setStartTime(Date.now());
        mic.onend = () => {
          console.log("continue..");
          // mic.start();
          setIsCorrect(null);
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        const lastWord = transcript.split(" ").pop().toUpperCase();
        setLastWord(lastWord);
        mic.onerror = (event) => {
          console.log(event.error);
          handleShow();
          console.log(show);
        };
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    words = sentence.split(" ");
  }, [sentence]);

  useEffect(() => {
    if (currentIndex === words.length - 1) {
      console.log("done");
      setIsListening(false);
      mic.stop();
    }

    if (isListening) {
      changeIndex();
    }
  }, [lastWord]);

  const speakWord = (word) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.55;
    synth.speak(utterance);
  };

  const changeIndex = () => {
    let isMatch = handleCompareClick(
      lastWord,
      words[currentIndex].replace(/[^\w\s]/g, "").toUpperCase()
    );
    console.log("Soundex says:", isMatch);
    if (
      lastWord === words[currentIndex].replace(/[^\w\s]/g, "").toUpperCase() ||
      isMatch
    ) {
      setIsCorrect(true);
      setCounter(0);
      setCurrentIndex(currentIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
      console.log("match", currentIndex, words[currentIndex]);
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000;
      console.log("Time taken:", timeTaken);
      setTimeTaken(timeTaken);
      setStartTime(endTime);
      // setLastWord("");
    } else {
      console.log("no match", currentIndex, words[currentIndex]);
      setCounter(counter + 1);

      //check if the previous word has a period
      if (currentIndex !== 0 && words[currentIndex - 1].includes(".")) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }

    // if(counter > 2){
    // }

    if (counter === 5) {
      speakWord(words[currentIndex]);
      if (!hardWords.includes(words[currentIndex])) {
        // const pronunciation = dictionary[words[currentIndex].toLowerCase()];
        // console.log(pronunciation);
        // setHardWords([...hardWords, [words[currentIndex], [pronunciation] ]]);
        const hardWord = words[currentIndex];
        const pronunciation = dictionary[hardWord.toLowerCase()];
        console.log(pronunciation);
        // if (hardWords.length === 2) {
        //   setHardWords([[hardWord, pronunciation]]);
        // } else {
        //   setHardWords([...hardWords, [hardWord, 0]]);
        // }

        setHardWords([...hardWords, hardWord]);
        console.log(hardWords);
      }
    } else if (counter > 10) {
      speakWord(words[currentIndex]);
      setCurrentIndex(currentIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
      setCounter(0);
    }
  };

  function handleSubmit() {
    if (inputText === "") {
      alert("Please enter a sentence");
      return;
    }
    window.scrollTo({
      top: resultsRef.current.offsetTop,
      behavior: "smooth",
    });
    setSentence(inputText);
    setInputText("");
  }

  function handleDelete(index) {
    const updatedWords = [...hardWords];
    updatedWords.splice(index, 1);
    setHardWords(updatedWords);
  }

  function handleCards() {
    for (let i = 0; i < hardWords.length; i++) {
      dispatch(addWord(hardWords[i]));
      console.log("Added a new word:", hardWords[i]);
    }
    window.location.href = "/cards";
  }

  const autoSpeak = () => {
    isStopRef.current = !isStopRef.current;
    setIsStop(isStopRef.current);
    let timeouts = [];

    for (let i = 0; i < words.length + 1; i++) {
      const timeoutId = setTimeout(() => {
        console.log(isStopRef.current);
        if (!isStopRef.current) {
          setIsListening(false);
          const word = words[i];
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.rate = 0.75;
          synth.speak(utterance);
          setCurrentIndex(i);
          setCurrentWord(words[currentIndex]);
        } else {
          // Stop all scheduled timeouts
          timeouts.forEach((timeout) => clearTimeout(timeout));
          return;
        }
      }, 1500 * i);

      timeouts.push(timeoutId);
    }
  };
  function handleReset() {
    setCounter(0);
    setCurrentIndex(0);
    setCurrentWord(words[0]);
    setIsStop(true);
  }

  function saveWord() {
    const newWord = words[currentIndex]
      .replace(/[^a-zA-Z0-9\s-]+$/, "")
      .replace(/^\W*(\w)/, (_, firstChar) => firstChar.toUpperCase());

    console.log(newWord);

    if (!hardWords.includes(newWord)) {
      setHardWords([...hardWords, newWord]);
    }
  }

  useEffect(() => {
    if (currentIndex === words.length) {
      setCurrentIndex(0);
      setCurrentWord(words[0]);
      setIsStop(true);
      isStopRef.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentWord(words[0]);
  }, [isStop]);

  function handleSkip(direction) {
    if (direction === "right") {
      setCurrentIndex(currentIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
    } else if (direction === "left") {
      setCurrentIndex(currentIndex - 1);
      setCurrentWord(words[currentIndex - 1]);
    }
  }

  return (
    <>
      <div className="mainCont">
        <div className="App">
          <Button onClick={() => setShow(true)}>Show Modal</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <motion.div
            className="search"
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              loop: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.15,
              borderColor: "rgba(0, 0, 0, 0)",
              transition: "border-color 0.3s easeInOut",
            }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="searchcontainer">
              <h2 style={{ marginTop: 5 }}>Enter your own sentence</h2>
              <div className="searchbox">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button variant="primary" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Examples
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </motion.div>
          <div ref={resultsRef} className="container">
            <div className="box">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(0, 0, 0, 0)",
                  transition: "border-color 0.3s easeInOut",
                }}
                className="allButtons"
              >
                {/* <h2>Sentence</h2> */}
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Fonts
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFont("sans-serif")}>
                      Sans-Serif
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFont("dyslexic")}>
                      Dyslexic
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFont("roboto")}>
                      Roboto
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                

                <ButtonGroup>
                  
                  {/* <Button
                  onClick={() => setIsListening((prevState) => !prevState)}
                >
                  {isListening ? "Stop Mic" : "Start Mic"}
                </Button> */}

                  <Button onClick={() => autoSpeak()}>
                    {isStop ? <Icon.Play /> : <Icon.Stop />}
                  </Button>

                  

                  <DropdownButton
                    as={ButtonGroup}
                    title="Font Size"
                    id="bg-nested-dropdown"
                  >
                    <div className="fontSizeCont">
                      <Form.Label>Font Size: {fontSize} </Form.Label>
                      <Form.Range
                        min={25}
                        max={60}
                        step={1}
                        value={fontSize}
                        // value={10}
                        onChange={(event) => setFontSize(event.target.value)}
                      />
                    </div>
                    {/* <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item> */}
                  </DropdownButton>
                </ButtonGroup>
                <div className="micstatus">
                  {isListening ? <Icon.Mic /> : <Icon.MicMute />}
                </div>
                <Button onClick={() => generateSent()}>
            Generate Random Sentence
          </Button>
              </motion.div>
              <hr></hr>
              <div className="sentenceBox">
                <p
                  style={{ fontSize: `${fontSize}px`, fontFamily: `${font}` }}
                  className="sentence"
                >
                  {words.map((word, index) => (
                    <>
                      <span
                        key={index}
                        className={`${
                          index === currentIndex ? "highlight select" : ""
                        } ${index < currentIndex ? "before" : ""}`}
                        onClick={() => isStop && speakWord(word)}
                        style={{
                          fontSize: `${
                            index === currentIndex
                              ? parseInt(fontSize) + 30
                              : parseInt(fontSize)
                          }px`,
                        }}
                      >
                        {/* <motion.div whileHover={{scale: 1.3}}> */}
                        {word}
                        {/* </motion.div> */}
                      </span>{" "}
                    </>
                  ))}
                </p>
                <div className="largeMic">
                  <motion.div
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      className="largeMicButton"
                      onClick={() => setIsListening((prevState) => !prevState)}
                      size="lg"
                      style={{ height: 110, width: 110 }}
                    >
                      {isListening ? (
                        <Icon.MicMute fontSize={60} />
                      ) : (
                        <Icon.Mic fontSize={60} />
                      )}
                    </Button>
                  </motion.div>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={() => handleSkip("left")}
                      disabled={currentIndex === 0}
                      variant="primary"
                    >
                      <motion.div
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        whileTap={{ scale: 0.7 }}
                      >
                        <Icon.ArrowLeftCircleFill></Icon.ArrowLeftCircleFill>
                      </motion.div>
                    </Button>
                    <Button onClick={() => saveWord()} variant="primary">
                      <motion.div
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        whileTap={{ scale: 0.7 }}
                      >
                        <Icon.PlusCircleFill></Icon.PlusCircleFill>
                      </motion.div>
                    </Button>
                    <Button
                      onClick={() => handleSkip("right")}
                      disabled={currentIndex === words.length - 1}
                      variant="primary"
                    >
                      <motion.div
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        whileTap={{ scale: 0.7 }}
                      >
                        <Icon.ArrowRightCircleFill />
                      </motion.div>
                    </Button>
                  </ButtonGroup>
                  <Button onClick={() => handleReset()}>
                    <motion.div
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      whileTap={{ scale: 0.7 }}
                    >
                      <Icon.ArrowClockwise></Icon.ArrowClockwise>
                    </motion.div>
                  </Button>
                </div>
              </div>
              <div className="validationCont">
                <div className="validation">
                  {isCorrect != null &&
                    lastWord != "" &&
                    isListening == true && (
                      <>
                        <ValidateAnimate
                          correct={isCorrect}
                          word={currentWord}
                        />{" "}
                      </>
                    )}
                </div>
              </div>
            </div>
            <div className="infobox">
              <div className="box">
                <h2>Live Info</h2>
                <h3>
                  Detected Word: <div className="highlight">{lastWord}</div>
                </h3>
                <h3>
                  Word You Need to Say:{" "}
                  <div className="highlight">{currentWord}</div>
                </h3>
                <h3>
                  Time taken for the last word:{" "}
                  <div className="highlight">{words[currentIndex - 1]}</div> is{" "}
                  {timeTaken}{" "}
                </h3>
              </div>
              <div className="box">
                <div className="hardWordsCont">
                  <h2>Hard Words</h2>
                  {hardWords.length > 0 && (
                    <Button variant="primary" onClick={() => handleCards()}>
                      Add to Flashcards
                    </Button>
                  )}
                </div>
                {hardWords.length > 0
                  ? hardWords.map((word, index) => (
                      <div key={index}>
                        <div className="hardRow">
                          <motion.div whileHover={{ scale: 1.2, color: "red" }}>
                            <Button
                              variant=""
                              onClick={() => handleDelete(index)}
                            >
                              <Icon.Trash></Icon.Trash>
                            </Button>
                          </motion.div>
                          <h5>{word}</h5>
                        </div>
                      </div>
                    ))
                  : "No hard words yet!"}

                {/* {wordsRedux.word.words.length > 0 ?
                 wordsRedux.word.words.map((word, index) => (
                    <div key={index}>
                      {word}
                    </div>
                  ))
                : "No hard words yet!"} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
