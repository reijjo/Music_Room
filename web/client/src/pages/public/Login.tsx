import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

const Login = () => {
  return (
    <div className="login-page">
      <h1 style={{ fontFamily: "MilgranRegular" }}>Log in</h1>
      <form style={{ width: "100%" }}>
        <div className="reg-fields">
          <div className="input-block">
            <div className="label-input">
              <label htmlFor="user">Email / Username</label>
              <MyInput className="my-input" />
            </div>
          </div>
          <div className="input-block">
            <div className="label-input">
              <label htmlFor="user">Password</label>
              <MyInput className="my-input" />
            </div>
          </div>
          <div className="input-block">
            <div className="label-input">
              <MyButton
                className="my-button filled-button"
                style={{
                  // width: "50%",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                }}
                type="submit"
              >
                Log In!
              </MyButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
