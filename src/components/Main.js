import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="фото профиля" className="profile__avatar"/>
        </button>
        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {
            props.cards.map(card => (
              <Card
                key={card._id}
                card={card}
                name={card.name}
                link={card.link}
                likes={card.likes.length}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;