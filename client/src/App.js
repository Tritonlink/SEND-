import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  axios.post("http://localhost/users", {
    name: "^^",
    password: "$$",
  });
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default App;
