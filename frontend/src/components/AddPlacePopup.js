import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
  };

  const addPlaceChildren = () => {
    return (
      <>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_name"
            placeholder="Title"
            minLength="1"
            maxLength="30"
            required
            id="title-input"
            ref={nameRef}
          />
          <span className="popup__input-error" id="title-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_link"
            placeholder="Image Link"
            required
            id="link-input"
            ref={linkRef}
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </label>
      </>
    );
  };
  return (
    <PopupWithForm
      name="new-place"
      title="New Place"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      children={addPlaceChildren()}
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;
