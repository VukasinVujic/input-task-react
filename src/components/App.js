import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [queryParam, setQueryParam] = useState("");
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      (async (queryParam) => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?q=${queryParam}`
        );
        setDataArray(response.data);
      })(queryParam);
    }, 2000);
  }, [queryParam]);

  const changeInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQueryParam(e.target.value);
    }
  };

  const giveBackResult = () => {
    // if correct
    if (queryParam && dataArray.length > 0) {
      return dataArray.map((element) => {
        return (
          <div key={element.id}>
            <h2>{element.title}</h2>
            <p>{element.body}</p>
          </div>
        );
      });
    } // if false
    else if (queryParam && dataArray.length === 0) {
      return "Sorry, we couldn't find anything";
      // if empty input field
    } else if (!queryParam && dataArray.length === 0) {
      return " ";
    }
  };

  return (
    <div>
      <form type="submit">
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
