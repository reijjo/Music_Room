import { User } from "../utils/types";

import searchIco from "../images/icons8-search.svg";

const Logged = ({ user }: { user: User }) => {
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
        <div className="side-grid">side</div>
        <div className="nav-grid">
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
          <div>notif settings</div>
        </div>
        <div className="main-grid">main</div>
        <div className="footer-grid">footer</div>
      </div>
      {/* <div>wohoo logged in</div>
      <h2>{user.username}</h2>
      <img src={pictureUrl} alt="user img" /> */}
    </div>
  );
};

export default Logged;
