import React, { useState, useEffect, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addWord, deleteWord, resetState } from "../actions/index.js";
import Cards from "../modules/card.js";
import { AnimatePresence, motion } from "framer-motion";

function Flashcards() {
  const [inputText, setInputText] = useState("");
  const wordsRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(-1);

  function handleReset() {
    dispatch(resetState());
  }

  function handleSubmit() {
    dispatch(addWord(inputText));
    console.log("Added a new word:", inputText);
    setInputText("");
  }

  function handleDelete(word) {
    setRefresh(wordsRedux.word.words.indexOf(word));
    dispatch(deleteWord(word));
    console.log("Deleted", word);
  }

  return (
    <AnimatePresence>
      <div className="mainCont">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          staggerChildren={0.1}
        >
          <div className="App">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="App-header"
            >
              <motion.div
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
                className="search"
              >
                <div className="searchcontainer">
                  <h2 style={{ marginTop: 5, color: "black", textAlign: "center" }}>
                    Add Hard Words
                  </h2>
                  <div className="searchbox">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    <Button variant="primary" onClick={() => handleSubmit()}>
                      <Icon.PlusCircleFill></Icon.PlusCircleFill>
                    </Button>
                    <Button variant="secondary" onClick={() => handleReset()}>
                      <Icon.Trash></Icon.Trash>
                    </Button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.1, translateY: -120 }}
                className="flashcardCont"
              >
                {wordsRedux.word.words.length > 0 && (
                  <Cards refresh={refresh} words={[...new Set(wordsRedux.word.words)]} />
                )}
                <div className="cardManagerCont">
                  <h3>Words</h3>
                  {wordsRedux.word.words.length > 0
                    ? wordsRedux.word.words.map((word, index) => (
                        <div key={index}>
                          <div className="hardRow">
                            {true ? (
                              <Icon.Check></Icon.Check>
                            ) : (
                              <Icon.Dash></Icon.Dash>
                            )}
                            <motion.div
                              whileHover={{ scale: 1.2, color: "red" }}
                            >
                              <Button
                                variant=""
                                onClick={() =>
                                  handleDelete(wordsRedux.word.words[index])
                                }
                              >
                                <Icon.Trash></Icon.Trash>
                              </Button>
                            </motion.div>
                            <h5>{word}</h5>
                          </div>
                        </div>
                      ))
                    : "No hard words yet!"}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Flashcards;
