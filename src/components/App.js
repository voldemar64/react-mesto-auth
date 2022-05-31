import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import tick from '../images/tick.svg';
import cross from '../images/cross.svg';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] =React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [mailName, setMailName] = React.useState('')
  const [popupTitle, setPopupTitle] = React.useState('')
  const [popupPhoto, setPopupPhoto] = React.useState('')
  const history = useHistory()


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData)
      setCards(cards)
    })
    .catch(err => console.log(`Ошибка при изначальной отрисовке данных: ${err}`));
  }, [])

  React.useEffect(() => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true)
            setMailName(res.data.email)
          }
        })
        .catch(err => console.log(`Не получается токен: ${err}`))
    }
  }, [])

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setPopupTitle('Вы успешно зарегистрировались!')
        setPopupPhoto(tick)
        history.push('/sign-in')
      })
      .catch(() => {
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
        setPopupPhoto(cross)
      })
      .finally(handleInfoTooltip)
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        setLoggedIn(true)
        setMailName(email)
        localStorage.setItem('jwt', res.token)
        history.push('/')
      })
  }

  function handleSignOut() {
    setMailName('')
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    history.push('/sign-in')
  }

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

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true)
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
    setIsInfoTooltipOpen(false)
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
        <Switch>
          <Route path="/sign-in">
            <>
              <Header route="/sign-up" title="Регистрация"/>
              <Login onLogin={handleLogin}/>
            </>
          </Route>
          <Route path="/sign-up">
            <>
              <Header route="/sign-in" title="Войти"/>
              <Register onRegister={handleRegister}/>
            </>
          </Route>
          <Route exact path="/">
            <>
              <Header route="" title="Выйти" mail={mailName} onClick={handleSignOut}/>
              <ProtectedRoute 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
                component={Main}
              />
              <Footer/>
            </>
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          title={popupTitle}
          photo={popupPhoto}
        />

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
