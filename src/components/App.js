import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData)
      setCards(cards)
    })
    .catch(err => console.log(`Ошибка при изначальной отрисовке данных: ${err}`));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.removeCardLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch(err => {
          console.log(`лайк не ставится: ${err}`);
        })
    } else {
      api.addCardLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => {
        console.log(`лайк не убирается: ${err}`);
      })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id && c))
    })
      .catch(err => {
        console.log(`карточка не удаляется: ${err}`)
      });
  }

  function handleUpdateUser(user) {
    api.patchUserInfo(user)
      .then(newInfo => {
        setCurrentUser(newInfo)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`ошибка при обновлении профиля: ${err}`)
      })
  }

  function handleUndateAvatar(data) {
    api.patchAvatar(data)
      .then(newAvatar => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`ошибка при обновлении аватара: ${err}`)
      })
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(`карточка не добавилась:  ${err}`)
      })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)

    setSelectedCard(null)
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer/>
        <ImagePopup
          onOverlayClick={handleOverlayClick}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <EditAvatarPopup
          onOverlayClick={handleOverlayClick}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUndateAvatar}
          buttonText={'Сохранить'}
        />
        <EditProfilePopup
          onOverlayClick={handleOverlayClick}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={'Сохранить'}
        />
        <AddPlacePopup
          onOverlayClick={handleOverlayClick}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={'Создать'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
