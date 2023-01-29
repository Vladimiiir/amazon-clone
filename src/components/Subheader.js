import React from "react";
import "./Subheader.css";
import MenuIcon from "@mui/icons-material/Menu";

function Subheader() {
  return (
    <div className="subheader">
      <div className="subheader__left">
        <div className="subheader__all">
          <MenuIcon />
          <a href="">All</a>
        </div>
        <a href="">Sell</a>
        <a href="">Home</a>
        <a href="">Today's Deals</a>
        <a href="">Prime</a>
        <a href="">Home Services</a>
        <a href="">Customer Service</a>
        <a href="">Health & Personal Care</a>
        <a href="">Pet Supplies</a>
        <a href="">Baby</a>
        <a href="">Beauty</a>
        {/* <a href="">Best Sellers</a>
        <a href="">Electronics</a>
        <a href="">Browsing History</a>
        <a href="">Grocery & Food</a>
        <a href="">Mobile Phones</a>
        <a href="">Fashion</a>
        <a href="">Buy Again</a> */}
      </div>
      <div className="subheader__right">
        <a
          href="https://www.amazon.ae/dp/B093QNNZ28/?_encoding=UTF8&ref_=nav_swm_Echo&pf_rd_p=d5fb330b-0db6-4df0-9327-ddb8bd8a7774&pf_rd_s=nav-sitewide-msg&pf_rd_t=4201&pf_rd_i=navbar-4201&pf_rd_m=A2VIGQ35RCS4UG&pf_rd_r=77JJ7X06122RFNFA4X9M"
          target="_blank"
        >
          <img src="https://m.media-amazon.com/images/G/39/UAE-hq/2022/img/Digital_Devices/Alexa/Evergreen/XCM_Manual_ORIGIN_1438174_4757317_400x39_2X._CB635058224_.jpg" />
        </a>
      </div>
    </div>
  );
}

export default Subheader;
