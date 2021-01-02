import React from "react";
import editIconLarge from "../images/edit_large_icon.svg";
import Card from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Avatar Pic" className="profile__avatar" src={avatar} />
          <div className="profile__avatar-edit" onClick={onEditAvatar}>
            <img src={editIconLarge} alt="" />
          </div>
        </div>
        <div className="profile__text-container">
          <h1 className="profile__name">{name}</h1>
          <button
            className="button button_edit"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{about}</p>
        </div>
        <button className="button button_add" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
