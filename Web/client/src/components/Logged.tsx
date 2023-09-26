import { User } from "../utils/types";

const Logged = ({ user }: { user: User }) => {
  return (
    <div id="logged">
      <h1>wohoo logged in</h1>
      <h2>{user.username}</h2>
    </div>
  );
};

export default Logged;
