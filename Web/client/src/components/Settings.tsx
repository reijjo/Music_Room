import { useState } from "react";
import { User } from "../utils/types";

// import searchIco from "../images/icons8-search.svg";
import NavGrid from "./grid-sections/NavGrid";
import InputField from "./common/InputField";
import MyButton from "./common/Button";

import fbico from "../images/icons8-facebook.png";
import googleico from "../images/icons8-google.png";

// const RadioButton = (props) => {
//   return (
//     <div className="radio-button">
//       <input
//         type="radio"
//         id={props.id}
//         name={props.name}
//         value={props.value}
//         checked={props.checked}
//         onChange={props.onChange}
//       />
//       <label htmlFor={props.id}>{props.text}</label>
//     </div>
//   );
// };

const Settings = ({ user }: { user: User }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [changeUsername, setChangeUsername] = useState(false);
  // const [changeEmail, setChangeEmail] = useState(false);

  // let pictureUrl;
  // if (typeof user.picture !== "string") {
  //   pictureUrl = user.picture.data.url;
  // } else {
  //   pictureUrl = user.picture;
  // }

  console.log("changeUsername", changeUsername);

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const cancelUsername = () => {
    setUsername(user.username);
    setChangeUsername(false);
  };

  console.log("USER", user);

  return (
    <div id="logged">
      <div className="grid-container">
        <div className="side-grid">side</div>
        <NavGrid user={user} />
        <div className="main-grid">
          <div className="settings">
            <h2>My info</h2>
            {/* USERNAME */}

            <div>
              <label htmlFor="username">Username</label>
              <div
                className="input-change"
                style={changeUsername ? { width: "calc(80% + 85px" } : {}}
              >
                <InputField
                  className="reg-input flex-input"
                  value={username}
                  readOnly={!changeUsername}
                  onChange={handleUsername}
                />
                <MyButton
                  className={`myButton ${
                    !changeUsername ? "outlinedButton" : "filledButton"
                  }`}
                  style={{ marginLeft: "4px", width: "80px" }}
                  onClick={() => {
                    !changeUsername
                      ? setChangeUsername(true)
                      : console.log("saved");
                  }}
                >
                  {!changeUsername ? "Change" : "Save"}
                </MyButton>
                {changeUsername && (
                  <MyButton
                    className="myButton outlinedButton"
                    onClick={cancelUsername}
                  >
                    Cancel
                  </MyButton>
                )}
              </div>
            </div>
            {/* EMAIL */}

            <div>
              <label htmlFor="email">Email</label>
              <div className="input-change">
                <InputField
                  className="reg-input flex-input"
                  value={email}
                  readOnly
                />
                <MyButton
                  className="myButton outlinedButton"
                  style={{ marginLeft: "4px", width: "80px" }}
                >
                  Change
                </MyButton>
              </div>
            </div>
            {/* AGE */}

            <div>
              <label htmlFor="age">Age</label>
              <div className="input-change">
                <InputField className="reg-input flex-input" readOnly />
                <MyButton
                  className="myButton outlinedButton"
                  style={{ marginLeft: "4px", width: "80px" }}
                >
                  Change
                </MyButton>
              </div>
            </div>
            {/* GENDER */}

            <div>
              <label htmlFor="gender">Gender</label>
              <div className="input-change">
                <InputField className="reg-input flex-input" readOnly />
                <MyButton
                  className="myButton outlinedButton"
                  style={{ marginLeft: "4px", width: "80px" }}
                >
                  Change
                </MyButton>
              </div>
            </div>
            {/* PICTURE */}

            <div>Change picture</div>
            <hr
              style={{
                width: "80%",
                border: "none",
                height: "1px",
                backgroundColor: "var(--text)",
              }}
            />
            {/* LINK ACCOUNTS */}
            <div
              className="oauth-logos"
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <div
                onClick={() => console.log("link fb")}
                style={{ minWidth: "min-content" }}
              >
                <img src={fbico} alt="oauth" title="facebook" />
                <div style={{ whiteSpace: "nowrap" }}>
                  Connect with Facebook
                </div>
              </div>
              <div
                onClick={() => {
                  console.log("link google");
                  // loginGoogle();
                }}
                style={{ minWidth: "min-content" }}
              >
                <img src={googleico} alt="oauth" title="facebook" />
                <div style={{ whiteSpace: "nowrap" }}>Connect with Google</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-grid">footer</div>
      </div>
      {/* <div>wohoo logged in</div>
		<h2>{user.username}</h2>
		<img src={pictureUrl} alt="user img" /> */}
    </div>
  );
};

export default Settings;
