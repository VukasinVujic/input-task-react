import React, { useState, useEffect } from "react";
import axios from "axios";

let firstRender = true;
let loadVar = false;

const App = () => {
  const [queryParam, setQueryParam] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const loading = (loadVar) => {
    return loadVar === true ? (
      <div className="result-class">
        <p>Loading...</p>
      </div>
    ) : (
      ""
    );
  };

  useEffect(() => {
    loadVar = true;
    setTimeout(() => {
      (async (queryParam) => {
        // to prevent loading without params
        if (!queryParam) {
          return;
        }

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?q=${queryParam}`
        );

        loadVar = false;
        setDataArray(response.data);
      })(queryParam);
    }, 1000);
  }, [queryParam]);

  const changeInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loadVar = true;
      setQueryParam(e.target.value);
    }
  };

  const giveBackResult = () => {
    if (loadVar) return loading(loadVar);
    // if correct
    if (queryParam !== "" && dataArray.length > 0) {
      firstRender = false;
      return dataArray.map((element) => {
        return (
          <div className="result-class" key={element.id}>
            <h2>{element.title}</h2>
            <p>{element.body}</p>
          </div>
        );
      });
    } // if false
    else if (queryParam !== "" && dataArray.length === 0 && !firstRender) {
      return (
        <div className="result-class">
          <p>Sorry, we couldn't find anything</p>
        </div>
      );
      // if empty input field
    } else if (queryParam === "" && dataArray.length === 0) {
      return "";
    }
  };

  return (
    <div className="big-container">
      <form type="submit" className="form-class">
        <input
          type="text"
          className="input-class"
          placeholder="Please start entering the text to search..."
          onKeyPress={(e) => changeInput(e)}
        />
      </form>
      {giveBackResult()}
    </div>
  );
};

export default App;
