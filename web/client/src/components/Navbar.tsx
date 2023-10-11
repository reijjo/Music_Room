import whitecas from "../assets/images/whitecas.png";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <img src={whitecas} alt="logo" height="50px" />
        <div style={{ fontFamily: "MilgranItalic" }}>Music Room</div>
      </div>
      <div className="nav-right">
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
