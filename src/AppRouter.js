import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { motion } from "framer-motion";
import App from "./Pages/App.js";
import Home from "./Pages/Home.js";
import Flashcards from "./Pages/Flashcards.js";
import Stats from "./Pages/Stats.js";


const history = createBrowserHistory();

function AppRouter() {

  return (
    <Router history={history}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/sentence" element={<App />} />
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Flashcards />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default AppRouter;
