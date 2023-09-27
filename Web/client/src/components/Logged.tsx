import { User } from "../utils/types";

const Logged = ({ user }: { user: User }) => {
  return (
    <div id="logged">
      <div>wohoo logged in</div>
      <h2>{user.username}</h2>
    </div>
  );
};

export default Logged;
