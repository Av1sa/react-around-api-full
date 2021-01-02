import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithImage from "./PopupWithImage";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    api
      .getAppInfo()
      .then(([cardListData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(cardListData);
      })
      .catch((error) => {
        console.log(error);
      });
    const token = localStorage.getItem("jwt");
    if (token) {
      validateAndSetUser(token);
    }
  }, []);

  const validateAndSetUser = (token) => {
    auth
      .validateUser(token)
      .then((user) => {
        setLoggedIn(true);
        setEmail(user.data.email);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const openSuccessTooltip = () => {
    setIsSuccessTooltipOpen(true);
  };
  const openErrorTooltip = () => {
    setIsErrorTooltipOpen(true);
  };
  const handleUpdateUser = ({ name, description }) => {
    api
      .setUserInfo({ currentUser, name: name, about: description })
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((c) => c._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked ? "DELETE" : "PUT")
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then((res) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});

    setIsSuccessTooltipOpen(false);
    setIsErrorTooltipOpen(false);
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/signin");
  };
  const handleSignIn = (data) => {
    auth
      .signInUser(data)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        validateAndSetUser(token);
      })
      .catch((err) => {
        openErrorTooltip();
        console.log(err);
      });
  };
  const handleRegister = (data) => {
    auth
      .registerUser(data)
      .then((res) => {
        openSuccessTooltip();
        history.push("/signin");
      })
      .catch((err) => {
        openErrorTooltip();
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute
          component={Main}
          exact
          path="/"
          loggedIn={loggedIn}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
        />
        <Route path="/signin">
          <Login onLogin={handleSignIn} />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route>
          <Redirect to={loggedIn ? "/" : "/signin"} />
        </Route>
      </Switch>
      {loggedIn && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithImage
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        type="success"
        isOpen={isSuccessTooltipOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        type="error"
        isOpen={isErrorTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
