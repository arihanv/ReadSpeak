import React from "react";
import LottieAnimation from "../modules/DogAnimate";
import PandaAnimation from "../modules/PandaAnimate";
import "../css/Home.css";
import { Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import nlp from "compromise";
import { retext } from "retext";
import stringify from "retext-stringify";
import english from "retext-english";
import contractions from "retext-contractions";
import pos from "retext-pos";
import { useDispatch } from "react-redux";
import { detectWord } from "../actions/index.js";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { CardImage, Check, Check2Circle } from "react-bootstrap-icons";

function Home() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cleanString = (input) => {
    let output = "";
    retext()
      .use(english)
      .use(contractions)
      .use(pos)
      .use(stringify)
      .process(input)
      .then((result) => {
        output = result.toString();
        console.warn(String(result));
      })
      .catch((error) => {
        console.error(error);
      });

    return output;
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const tryExample = (ind) => {
    switch (ind) {
      case 0:
        dispatch(
          detectWord("The boy and his friend are playing soccer in the park.")
        );
        break;
      case 1:
        dispatch(detectWord("The dog is barking at the cat."));
        break;
      case 2:
        dispatch(detectWord("The fast car is driving down the street."));
        break;
      default:
        dispatch(detectWord("I love to read and write."));
        break;
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      // setTextResult("");
    }
  };

  const convertImageToText = () => {
    if (selectedImage) {
      Tesseract.recognize(selectedImage, "eng", {
        logger: (m) => setProgress(m.progress),
      }).then(({ data: { text } }) => {
        console.log(text);
        const cleanedText = nlp(text)
          .normalize()
          .out("text")
          .replace(/[^\w\s.'"’]+(?![^.]*$)/gi, "")
          .replace(/\b(?!(?:[aAiIs]\b|\b\w{2}\b))\w\b/g, "") // updated regex to exclude periods
          .replace(/(['"])\s*\1/g, "")
          .replace(/\s+/g, " ")
          .replace(/\d+/g, "")
          .trim();

        handleShow();
        setTextResult(cleanedText);
        dispatch(detectWord(cleanedText));

        fetch("http://localhost:4000?q=" + encodeURIComponent(text))
          .then((response) => response.text())
          .then((data) => {
            console.error(data);
            setTextResult(cleanString(data));
          })
          .catch((error) => {
            console.error("Error:", "The server is likely not running");
            console.error("Error:", error);
          });
      });
    }
  };

  useEffect(() => {
    convertImageToText();
  }, [selectedImage]);

  return (
    <div className="App">
      <header className="App-header Home">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ x: 0, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="mainCont"
        >
          <div className="titleCont">
            <div>
              <div className="backSourceCont">
                <motion.div
                  initial={{ background: "rgb(205, 117, 9)", width: "30%" }}
                  animate={{ background: "#FFFFFF", width: "90%" }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,

                    default: { duration: 1 },
                  }}
                  className="sourceCont"
                >
                  <div className="animationCont panda">
                    <PandaAnimation />
                  </div>
                  <div className="sourceText">
                    Developed by <b>Arihan Varanasi</b>
                  </div>
                </motion.div>
              </div>
              <motion.div
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ rotate: -2 }}
                className="titleText"
              >
                <motion.h1
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,

                    default: { duration: 1 },
                  }}
                  className="title"
                >
                  READSPEAK
                </motion.h1>
                <motion.h2
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,

                    default: { duration: 1 },
                  }}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  Your Reading Assistant
                </motion.h2>
                <motion.hr
                  variants={variants}
                  initial="hidden"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,

                    default: { duration: 1 },
                  }}
                  animate="visible"
                  custom={3}
                />
                <motion.h5
                  variants={variants}
                  initial="hidden"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,

                    default: { duration: 1 },
                  }}
                  animate="visible"
                  custom={4}
                >
                  <Button
                    variant="success"
                    className="getButton"
                    href="/sentence"
                  >
                    Get Started!
                  </Button>
                </motion.h5>
              </motion.div>
            </div>
            <motion.div whileHover={{ rotate: 5 }} className="animationCont">
              <LottieAnimation />
            </motion.div>
          </div>
          <motion.div
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="buttonCont"
          >
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Any Changes?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  type="text"
                  value={textResult}
                  onChange={(e) => setTextResult(e.target.value)}
                ></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={() => dispatch(detectWord(textResult))}
                  href="/sentence"
                  variant="primary"
                >
                  Understood
                </Button>
              </Modal.Footer>
            </Modal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="optionsCont"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Card>
                <Card.Header>Use An Image</Card.Header>
                <Card.Body>
                  <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Control
                      accept="image/*"
                      onChange={handleChangeImage}
                      type="file"
                      size="lg"
                    />
                    <label for="myFileInput" id="myLabel">
                      <Button className="formButton">
                        Upload An Image <CardImage></CardImage>
                      </Button>
                    </label>
                  </Form.Group>
                  <Card.Subtitle className="mb-2 text-muted">
                    {progress != 0 && (
                      <>
                        {" "}
                        {progress == 1 ? (
                          <>
                            <Check></Check>{" "}
                          </>
                        ) : (
                          <>{progress}</>
                        )}{" "}
                      </>
                    )}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Card>
                <Card.Header>Enter A Sentence</Card.Header>
                <Card.Body>
                  <input
                    type="text"
                    placeholder="Enter your own sentence here"
                    value={textResult}
                    onChange={(e) => setTextResult(e.target.value)}
                  />
                  <Button
                    href="/sentence"
                    onClick={() => dispatch(detectWord(textResult))}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Card>
                <Card.Header>Use An Example</Card.Header>
                <ListGroup
                  style={{ borderRadius: 20 }}
                  className="listCont"
                  variant="flush"
                >
                  <ListGroup.Item>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Button
                        href="/sentence"
                        onClick={() => tryExample(0)}
                        variant="primary"
                      >
                        Example 1
                      </Button>
                    </motion.div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Button
                        href="/sentence"
                        onClick={() => tryExample(1)}
                        variant="primary"
                      >
                        Example 2
                      </Button>
                    </motion.div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Button
                        href="/sentence"
                        onClick={() => tryExample(2)}
                        variant="primary"
                      >
                        Example 3
                      </Button>
                    </motion.div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>
    </div>
  );
}

export default Home;
