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
                              <li><a href="/events">Events</a></li>
                          </ul>
                      </div>
                      <div className="col-sm-6 col-md-3 item">
                          <h3>Über uns</h3>
                          <ul>
                              <li><a href="#">Impressum</a></li>
                              <li><a href="#">AGB</a></li>
                              <li><a href="#">Cookie-Richtlienien</a></li>
                              <li><a href="#">Datenschtuzurichtlienie</a></li>

                          </ul>
                      </div>
                      <div className="col-md-6 item text">
                          <h3>CampusAPP</h3>
                          <p>Von Studis für Studis. Unsere Mission ist es, euch näher zusammen zu bringen und einen lokalen nachhaltigen Markt an der Hochschule Kaiserslautern zu etablieren.</p>
                      </div>
                      <div className="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                  </div>
                  <p className="copyright">CampussAPP © 2021</p>
              </div>
          </footer>
      </div> 
);

export default Footer;