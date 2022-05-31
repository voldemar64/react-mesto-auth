import { Link } from "react-router-dom";

import logoPath from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} alt="логотип" className="header__logo" />
      <nav className="header__nav">
        <p className="header__email">{props.mail}</p>
        <Link to={props.route} type="button" className="header__link" onClick={props.onClick}>{props.title}</Link>
      </nav>
    </header>
  )
}

export default Header;