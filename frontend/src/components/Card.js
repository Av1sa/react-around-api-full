import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardDelete, onCardClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, link, likes, owner } = card;
  const isOwn = currentUser._id === owner._id;
  const isLiked = likes.some((item) => item._id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card);
  };

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        alt={`Pic: ${name}`}
        src={link}
        onClick={handleClick}
      />
      <div className="card__text-container">
        <p className="card__text">{name}</p>
        <div className="card__likes-container">
          <button
            className={`button button_like ${isLiked && "button_like-black"}`}
            onClick={handleLikeClick}
          />
          <p className="card__likes-text">{likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button className="button button_delete" onClick={handleDeleteClick} />
      )}
    </li>
  );
}

export default Card;
