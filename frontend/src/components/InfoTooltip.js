import React from "react";
import imgSuccess from "../images/success_tooltip.svg";
import imgError from "../images/error_tooltip.svg";

function InfoTooltip({ isOpen, onClose, type }) {
  let src, alt, text;
  switch (type) {
    case "success":
      src = imgSuccess;
      alt = "Pic: success";
      text = "Success! You have now been registered.";
      break;
    default:
      src = imgError;
      alt = "Pic: error";
      text = "Oops, something went wrong! Please try again.";
  }
  return (
    <div className={`popup ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container popup__container_form popup__container_tooltip">
        <img src={src} alt={alt} />
        <p className="popup__text">{text}</p>
        <button className="button button_close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
