import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../api/users";
import { User } from "../../utils/types";
import { Link } from "react-router-dom";
import MyButton from "../../components/MyButton";

const Verify = () => {
  const [user, setUser] = useState<User>();
  const { code } = useParams<{ code?: string }>();

  useEffect(() => {
    const checkVerifycode = async (code: string) => {
      const res = await userService.verifyUser(code);
      setUser(res);
    };
    if (code) {
      checkVerifycode(encodeURIComponent(code));
    }
  }, [code]);

  console.log("user", user);

  return (
    <div className="register-page">
      <h1 style={{ fontFamily: "MilgranRegular" }}>Account verification</h1>
      {user ? (
        <>
          <h2>User verified!</h2>
          <div>You can now log in with your Username or Email</div>
          <div className="grid-for-2">
            <div>
              <div>Username: </div>
              <div>Email:</div>
            </div>
            <div>
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
          </div>
          <Link to="/login">
            <MyButton
              className="my-button text-button"
              style={{
                padding: "0",
                margin: "10px",
                fontSize: "inherit",
                // textDecoration: "underline",
              }}
            >
              Click here to log in!
            </MyButton>
          </Link>
        </>
      ) : (
        <>
          <h2>Invalid verifycode!</h2>
          <Link to="/">
            <MyButton
              className="my-button text-button"
              style={{
                padding: "0",
                margin: "10px",
                fontSize: "inherit",
                // textDecoration: "underline",
              }}
            >
              Please go back.
            </MyButton>
          </Link>
        </>
      )}
    </div>
  );
};

export default Verify;
