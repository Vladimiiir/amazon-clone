import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  const firstWords = (str) => {
    const firstSpaceIndex = str.indexOf(" ");
    return str.substring(0, firstSpaceIndex);
  };

  return (
    <div className="header">
      {/* Logo */}
      <Link to="/">
        <img className="header__logo" src="/pictures/AmazonLogo.png" alt="" />
      </Link>
      {/* Search Bar */}
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="What are you searching for?"
        />
        <SearchIcon className="header__searchIcon" />
      </div>
      {/* Navbar */}
      <div className="header__nav">
        <div className="header__option" onClick={handleAuth}>
          <span className="header__optionLineOne">
            Hello {!user ? "Guest" : firstWords(user?.displayName)}
          </span>
          <Link to="/login">
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </Link>
        </div>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        {/*  */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
