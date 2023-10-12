import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>Lorem ipsum dolor sit amet.</div>

      <div>
        {" "}
        <Link to="https://github.com/reijjo" target="_blank">
          reijjo © 2023
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
