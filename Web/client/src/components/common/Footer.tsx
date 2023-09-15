import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>Lorem ipsum dolor sit.</div>

      <div>
        <Link
          to="https://github.com/reijjo"
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          reijjo &copy;
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
