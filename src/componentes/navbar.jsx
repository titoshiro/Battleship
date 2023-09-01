
import titulo from "./imagenes/images.jpeg";
import "../style/navbar.css"

const Navbar = () => {
  return (
    <nav className=" nav">
      <div className="container-fluid">
        <div className="center-image">
          <img src={titulo} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
