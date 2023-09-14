import { useState } from "react";

import testService from "./services/testService";

const App = () => {
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
    </div>
  );
};

export default App;
