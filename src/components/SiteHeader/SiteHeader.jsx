import "./SiteHeader.scss";

import Avatar from "../Avatar";
import Btn from "../Btn";

import searchIcon from "../../assets/icons/search.svg";
import logo from "../../assets/logo/BrainFlix-logo.svg";

function SiteHeader(props) {
  function search(formData) {
    formData.preventDefault();
  }

  return (
    <header className="site-header">
      <img src={logo} alt="site logo" />
      <form onSubmit={search}>
        <input
          name="query"
          placeholder="Search"
          className="site-header__search"
        />
      </form>
      <Avatar isLoggedIn={true} />
      <Btn label="upload"></Btn>
    </header>
  );
}

export default SiteHeader;
