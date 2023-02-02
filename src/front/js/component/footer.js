import React, { Component } from "react";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <div className="container">
      <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 footer-container">
        <p className="col-md-4 mb-0 text-footer">© 2023 Fit Central | All Rights Reserved</p>

        <ul
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto footer-icons"
        >
		<li><i className="fa-brands fa-facebook"></i></li>
		<li><i className="fa-brands fa-instagram"></i></li>
		<li><i className="fa-brands fa-twitter"></i></li>
		<li><i className="fa-brands fa-tiktok"></i></li>
		</ul>

        <ul className="nav col-md-4 justify-content-end footer-list">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 footer-items">
              Programs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 footer-items">
              Coaches
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 footer-items">
              FAQS
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 footer-items">
              Account
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 footer-items">
              Join Now
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
