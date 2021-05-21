import React from "react";
import './Footer.css';

const Footer = () => (
  <div className="footer-dark">
          <footer>
              <div className="container">
                  <div className="row">
                      <div className="col-sm-6 col-md-3 item">
                          <h3>Kategorien</h3>
                          <ul>
                              <li><a href="/Marktplatz">Marktplatz</a></li>
                              <li><a href="/Events">Events</a></li>
                          </ul>
                      </div>
                      <div className="col-sm-6 col-md-3 item">
                          <h3>Über uns</h3>
                          <ul>
                              <li>Impressum</li>
                              <li>AGB</li>
                              <li><a href="/Cookiepolicy">Datenschtuzurichtlienie</a></li>

                          </ul>
                      </div>
                      <div className="col-md-6 item text">
                          <h3>CampusAPP</h3>
                          <p>Von Studis für Studis. Unsere Mission ist es, euch näher zusammen zu bringen und einen lokalen nachhaltigen Markt an der Hochschule Kaiserslautern zu etablieren.</p>
                      </div>
                  </div>
                  <p className="copyright">CampusAPP © 2021</p>
              </div>
          </footer>
      </div> 
);

export default Footer;