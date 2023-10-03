import { User } from "../utils/types";

const Logged = ({ user }: { user: User }) => {
  let pictureUrl;
  if (typeof user.picture !== "string") {
    pictureUrl = user.picture.data.url;
  } else {
    pictureUrl = user.picture;
  }

  return (
    <div id="logged">
      <div>wohoo logged in</div>
      <h2>{user.username}</h2>
      <img src={pictureUrl} alt="user img" />
    </div>
  );
};

export default Logged;
