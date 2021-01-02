import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container popup__container_form">
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="button button_save popup__input">
            {buttonText}
          </button>
        </form>
        <button className="button button_close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
