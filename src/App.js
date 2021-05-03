import React from "react";
import SearchForm from "./SearchForm.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="parent">
        <div className="header">
          <h1>Check your nearest vaccination center and slots availability</h1>
        </div>
        <SearchForm />
        {/* <div className="footer">
          Designed and Devloped by
          <a
            href="https://www.linkedin.com/in/nishant-kumar-mishra-8503a9122/"
            target="_blank"
            style={{ color: "white" }}
            rel="noreferrer"
          >
            Nishant Mishra
          </a>
          and
          <a
            href="https://www.linkedin.com/in/prince-jain-148635187/"
            target="_blank"
            style={{ color: "white" }}
            rel="noreferrer"
          >
            Prince jain
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default App;
