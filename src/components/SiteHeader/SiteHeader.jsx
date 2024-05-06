import "./SiteHeader.scss";

// Import avatar and cta button components
import Avatar from "../Avatar";
import Btn from "../Btn";

// import logo image to display
import logo from "../../assets/logo/BrainFlix-logo.svg";

import { Link } from "react-router-dom";

function SiteHeader() {
  function search(formData) {
    formData.preventDefault();
  }

  return (
    <header className="site-header">
      <Link to="/">
        <img src={logo} alt="site logo" className="site-header__logo" />
      </Link>
      <nav className="site-header__nav">
        <form onSubmit={search} className="site-header__form">
          <input
            name="query"
            placeholder="Search"
            className="site-header__search"
            type="search"
          />
        </form>
        <div className="site-header__avatar-container">
          <Avatar isLoggedIn={true} />
        </div>
        <div className="site-header__upload-container">
          <Link to="/upload">
            <Btn label="upload" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
