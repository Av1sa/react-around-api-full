import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, description });
  };

  const editProfileChildren = () => {
    return (
      <>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_name"
            placeholder="Edit Name"
            minLength="2"
            maxLength="40"
            pattern="[A-Za-z -]+"
            required
            id="name-input"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <span id="name-input-error" className="popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_desc"
            placeholder="Edit Job"
            minLength="2"
            maxLength="200"
            required
            id="desc-input"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="popup__input-error" id="desc-input-error"></span>
        </label>
      </>
    );
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={editProfileChildren()}
    />
  );
}

export default EditProfilePopup;
