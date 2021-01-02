import React from "react";

function PopupWithImage({ card, onClose, isOpen }) {
  const { name, link } = card;
  return (
    <div className={`popup popup_image ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <img className="popup__image" alt={name} src={link} />
        <h2 className="popup__image-title">{name}</h2>
        <button className="button button_close" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithImage;
