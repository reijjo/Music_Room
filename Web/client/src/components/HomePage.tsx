import { useState } from "react";

import testService from "../services/testService";

const Homepage = () => {
  const [test, setTest] = useState("");

  const getText = async () => {
    try {
      const resp = await testService.testAxios();
      setTest(resp);
    } catch (error) {
      console.log("WHAT THE HELL ERROR");
    }
  };

  console.log("TEST", test);

  return (
    <div>
      <button onClick={getText}>test axios</button>
      <p style={{ color: "var(--ok)" }}>OK testi</p>
      <p style={{ color: "var(--success" }}>SUCCESS testi</p>
      <p style={{ color: "var(--warn)" }}>WARN testi</p>
      <p style={{ color: "var(--error)" }}>ERROR testi</p>
    </div>
  );
};

export default Homepage;
