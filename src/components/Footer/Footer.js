import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./footer.css"
function Footer() {
  return (
    <footer className="bg-dark abs" style={{height: 70}}>
      <div className="container">
        <div className="text-light p-3" style={{textAlign:"center"}}>
            <span>All rights reserved @ Eman Mohammed</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;