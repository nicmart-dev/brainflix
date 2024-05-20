import "./SiteHeader.scss";

// Import avatar and cta button components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";

// import logo image to display
import logo from "../../assets/logo/BrainFlix-logo.svg";

import { Link, useLocation } from "react-router-dom";

function SiteHeader() {
  function search(formData) {
    formData.preventDefault();
  }

  // check current location to only display line divider in upload page
  const location = useLocation();
  const currentPath = location.pathname;
  let className = "site-header";
  if (currentPath === "/upload") className += ` site-header--upload`;

  return (
    <header className={className}>
      <Link to="/" className="site-header__logo-container">
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
            <Button label="upload" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
