import { User } from "../utils/types";

// import { Link } from "react-router-dom";
import SideGrid from "./grid-sections/SideGrid";
import FooterGrid from "./grid-sections/FooterGrid";
// import MainGrid from "./grid-sections/MainGrid";
import NavGrid from "./grid-sections/NavGrid";

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
        <SideGrid />
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
