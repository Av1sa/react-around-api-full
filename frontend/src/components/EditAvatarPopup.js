import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };
  
  const editAvatarChildren = () => {
    return (
      <>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_avatar"
            placeholder="Avatar Link"
            required
            id="avatar-input"
            ref={avatarRef}
          />
          <span id="avatar-input-error" className="popup__input-error"></span>
        </label>
      </>
    );
  };
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change Profile Picture"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      children={editAvatarChildren()}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;
