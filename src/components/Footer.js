import React from "react";

const currentDate = new Date();
const year = currentDate.getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  )
}

export default Footer;