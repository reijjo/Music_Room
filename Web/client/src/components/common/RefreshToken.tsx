import { useState, useEffect } from "react";

const RefreshToken = () => {
  const [tokenWarning, setTokenWarning] = useState(false);

  return (
    <div className="token-warning">
      <p>Your token is about to expire</p>
      <button>I do not care.</button>
      <button>Get fresh token!</button>
    </div>
  );
};

export default RefreshToken;
