import React from "react";
import LottieAnimation from "../modules/DogAnimate";
import PandaAnimation from "../modules/PandaAnimate";
import "../css/Home.css";
import { Button } from "react-bootstrap";
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

function Home() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

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
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        console.log(text);
        const cleanedText = nlp(text)
          .normalize()
          .out("text")
          .replace(/[^\w\s.'"’]+(?![^.]*$)/gi, "")
          .replace(/\b(?!(?:[aAiIs]\b|\b\w{2}\b))\w\b/g, "")// updated regex to exclude periods
          .replace(/(['"])\s*\1/g, "")
          .replace(/\s+/g, " ")
          .replace(/\d+/g, "")
          .trim();

        handleShow()
        setTextResult(cleanedText);
        dispatch(detectWord(cleanedText));

        fetch("http://localhost:4000?q=" + encodeURIComponent(text))
          .then((response) => response.text())
          .then((data) => {
            console.error(data)
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
                  Easily read and speak
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
                  Click the Button Below!
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
            <Button variant="success" href="/sentence">
              Get Started!
            </Button>
            <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

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
                  <textarea  type="text"
                    value={textResult}
                    onChange={(e) => setTextResult(e.target.value)} ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={dispatch(detectWord(textResult))} href="/sentence" variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
          </motion.div>

          <motion.div>
            <p>Gets words in images</p>
            <div className="input-wrapper">
              <label htmlFor="upload">Upload Image</label>
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </div>

            <div className="result">
              {selectedImage && (
                <div className="box-image">
                  <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
                </div>
              )}
              {/* {textResult && (
                <div className="box-p">
                  <p>{textResult}</p>
                </div>
              )} */}
            </div>
          </motion.div>
        </motion.div>
      </header>
    </div>
  );
}

export default Home;
