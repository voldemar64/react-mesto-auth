import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = props.card.owner._id === currentUser._id
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `${isLiked ? 'card__like-button card__like-button_liked' : 'card__like-button'}`;

  function handleClick() {
    props.onCardClick(props.card)
  } 

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="card">
    <img src={props.link} alt={props.name} className="card__photo" onClick={handleClick}/>
    <div className="card__description">
      <h2 className="card__heading">{props.name}</h2>
      <div className="card__like-container">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <p className="card__like-counter">{props.likes}</p>
      </div>
    </div>
    <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
  </li>
  )
}

export default Card;