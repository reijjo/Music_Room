import { useState } from "react";
import { User } from "../utils/types";

import searchIco from "../images/icons8-search.svg";
import { Link } from "react-router-dom";
import SideGrid from "./grid-sections/SideGrid";
import FooterGrid from "./grid-sections/FooterGrid";
// import MainGrid from "./grid-sections/MainGrid";
import NavGrid from "./grid-sections/NavGrid";

const Logged = ({ user }: { user: User }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  let pictureUrl;
  if (typeof user.picture !== "string") {
    pictureUrl = user.picture.data.url;
  } else {
    pictureUrl = user.picture;
  }

  console.log("user", user);
  console.log("picture url", pictureUrl);

  return (
    <div id="logged">
      <div className="grid-container">
        {/* <div className="side-grid">side</div> */}
        <SideGrid />
        {/* <div className="nav-grid">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              className="search-icon"
              src={searchIco}
              alt="search"
              height="20px"
              onClick={() => console.log("search")}
            />
            <input className="search-input" placeholder="Search" />
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
                  <div className="dropdown-user-settings">
                    <Link to="/settings" className="plain-link">
                      Settings
                    </Link>
                  </div>
                  <div
                    className="dropdown-user-logout"
                    style={{ borderTop: "1px solid var(--text)" }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div> */}
        <NavGrid user={user} />
        {/* <MainGrid /> */}
        <div className="main-grid">main</div>
        <FooterGrid />
        {/* <div className="footer-grid">footer</div> */}
      </div>
      {/* <div>wohoo logged in</div>
      <h2>{user.username}</h2>
      <img src={pictureUrl} alt="user img" /> */}
    </div>
  );
};

export default Logged;
