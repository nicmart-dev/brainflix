import "./SiteHeader.scss";

// Import avatar and cta button components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Form from "../Form/Form";

// import logo image to display
import logo from "../../assets/logo/BrainFlix-logo.svg";

import { Link, useLocation } from "react-router-dom";

function SiteHeader() {
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
        <Form cta="query" />
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
