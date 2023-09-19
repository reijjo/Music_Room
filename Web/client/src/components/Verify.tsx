import MyButton from "./common/Button";
import { Link, useParams } from "react-router-dom";
import { User } from "../utils/types";
import { useState, useEffect } from "react";
import userService from "../services/userService";
import loadico from "../images/icons8-loading.gif";

const Verify = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    console.log("code", code);
    const verification = async (verify: string) => {
      try {
        const res = await userService.verifyUser(verify);
        setUser(res || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting verification", error);
      }
    };

    if (code) {
      verification(code);
    }
  }, [code]);

  console.log("user", user);
  return (
    <div className="basic-container">
      {isLoading && !user?.username ? (
        <img src={loadico} alt="loading" />
      ) : (
        <div className="info-container">
          {user ? (
            <>
              <h2>Ok, you are now ready for music!</h2>
              <div className="verified-username">
                <h4>Username:</h4>
                <h3>{user?.username}</h3>
              </div>
              <Link to="/login">
                <MyButton className="myButton filledButton">Login!</MyButton>
              </Link>
            </>
          ) : (
            <>
              <h2>No such user.</h2>
              <div className="verified-username" style={{ width: "200px" }}>
                Please go away.
              </div>
              <br />
              <Link to="/">
                <MyButton className="myButton filledButton">Click.</MyButton>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
