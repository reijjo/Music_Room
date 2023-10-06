import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../utils/types";

import searchIco from "../../images/icons8-search.svg";

const NavGrid = ({ user }: { user: User }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  let pictureUrl;
  if (typeof user.picture !== "string") {
    pictureUrl = user.picture.data.url;
  } else {
    pictureUrl = user.picture;
  }

  const userLogout = () => {
    if (user.loginStyle === "google") {
      console.log("logout google");
      localStorage.removeItem("music-token");
      window.location.replace("/");
    } else if (user.loginStyle === "facebook") {
      localStorage.removeItem("music-token");
      localStorage.removeItem("facebook-token");

      const fbLogout = () => {
        FB.getLoginStatus((response) => {
          console.log("HIHUU", response);
        });
        FB.logout(function (response) {
          localStorage.removeItem("facebook-token");
          console.log("FB LOGOUT RESPO", response);
        });
      };
      fbLogout();
      console.log("logout facebook");
      window.location.replace("/");
    } else {
      console.log("lets logout");
    }
  };
  return (
    <div className="nav-grid">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="search-icon"
          src={searchIco}
          alt="search"
          height="20px"
          onClick={() => console.log("search")}
        />
        <input
          className="search-input"
          placeholder="Search"
          name="search-bar"
        />
      </div>
      <div className="dropdowns">
        <div className="user-notifications">notif</div>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          onClick={() => {
            setSettingsOpen(!settingsOpen);
          }}
        >
          <img src={pictureUrl} alt="user-image" className="user-image" />
          {settingsOpen && (
            <div className="dropdown-user">
              <div className="dropdown-user-profile">
                <Link to="/logged" className="plain-link">
                  My Profile
                </Link>
              </div>
              <div className="dropdown-user-settings">
                {" "}
                <Link to="/settings" className="plain-link">
                  Settings
                </Link>
              </div>
              <div
                onClick={userLogout}
                className="dropdown-user-logout"
                style={{ borderTop: "1px solid var(--text)" }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavGrid;
