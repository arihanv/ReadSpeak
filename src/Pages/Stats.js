import React from "react";
import Star from "../modules/lottie/star.svg";
import { motion } from "framer-motion";
import "../css/Stats.css";
import { Button } from "react-bootstrap";

function Stats() {
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
  return (
    <div className="App">
      <header className="App-header Home">
        <div className="mainCont">
          <div className="titleCont statsCont">
            <div className="titleText statsTitle">
              <div className="trophyWrapper">
                <motion.img
                  src={Star}
                  alt="My SVG Image"
                  style={{
                    height: "100px",
                    animate: { height: 200 },
                    transition: { duration: 2, ease: "easeInOut" },
                  }}
                />
              </div>
              <motion.div className="titleTextCont">My Stats</motion.div>
            </div>
            <motion.div
              animate={{
                boxShadow: "0px 0px 100px 30px rgba(255,255,255,0.25)",
              }}
              transition={{
                duration: 1,
                loop: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.25,
                borderColor: "rgba(0, 0, 0, 0)",
                transition: "border-color 0.3s easeInOut",
              }}
              className="titleText"
            >
              <motion.div className="titleAwards">
                <motion.h3
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
                >
                  Words Read: {100}
                </motion.h3>
                <motion.h3
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
                  Words Studied: 100
                </motion.h3>
              </motion.div>
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
                Since "1995/12/2006"
              </motion.h5>
            </motion.div>
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
              <Button variant="secondary" href="/stats">
                Reset Stats
              </Button>
            </motion.div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Stats;
