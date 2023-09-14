import { useState } from "react";

import testService from "../services/testService";

import MyButton from "./common/Button";

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
      <br />
      <MyButton className="myButton textButton" type="button">
        text BUTTON
      </MyButton>
      <br />
      <MyButton className="myButton filledButton" type="button">
        contained BUTTON
      </MyButton>
      <br />
      <MyButton className="myButton outlinedButton" type="button">
        outlined BUTTON
      </MyButton>
      <h1 style={{ color: "var(--ok)" }}>OK testi</h1>
      <h1 style={{ color: "var(--success" }}>SUCCESS testi</h1>
      <h1 style={{ color: "var(--warn)" }}>WARN testi</h1>
      <h1 style={{ color: "var(--error)" }}>ERROR testi</h1>
      <h1 style={{ color: "var(--prima)" }}>PRIMARY testi</h1>
      <h1 style={{ color: "var(--seco)" }}>SECONDARY testi</h1>
      <h1 style={{ color: "var(--primamid)" }}>PRIMAMID testi</h1>
      <h1 style={{ color: "var(--primalight)" }}>PRIMALIGHT testi</h1>
      <h1 style={{ color: "var(--background)" }}>BACKGROUND testi</h1>
      <h1 style={{ color: "var(--text)" }}>TEXT testi</h1>
    </div>
  );
};

export default Homepage;
