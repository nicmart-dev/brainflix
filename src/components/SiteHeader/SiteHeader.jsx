import "./SiteHeader.scss";

import Avatar from "../Avatar";
import Btn from "../Btn";

import logo from "../../assets/logo/BrainFlix-logo.svg";

function SiteHeader() {
  function search(formData) {
    formData.preventDefault();
  }

  return (
    <header className="site-header">
      <img src={logo} alt="site logo" className="site-header__logo" />
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
          <Btn label="upload" />
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
