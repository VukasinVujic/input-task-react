import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [queryParam, setQueryParam] = useState("");
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    (async (queryParam) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?q=${queryParam}`
      );

      setDataArray(response.data);
    })(queryParam);
  }, [queryParam]);

  const changeInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQueryParam(e.target.value);
    }
  };

  const giveBackResult = () => {
    // if correct
    if (queryParam !== "" && dataArray.length > 0) {
      console.log("aaaaa");

      return dataArray.map((element) => {
        return (
          <div className="result-class" key={element.id}>
            <h2>{element.title}</h2>
            <p>{element.body}</p>
          </div>
        );
      });
    } // if false
    else if (queryParam !== "" && dataArray.length === 0) {
      console.log("bbbbbbbbb");
      return (
        <div className="result-class">
          <p>Sorry, we couldn't find anything</p>
        </div>
      );
      // if empty input field
    } else if (queryParam === "" && dataArray.length === 0) {
      console.log("cccccc");
      return "";
    }
  };

  return (
    <div>
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
