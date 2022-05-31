import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); //офигеть, я додумался, как сделать так, чтобы поля заполнялись заново, если закрыть попап

  function changeName(e) {
    setName(e.target.value)
  }

  function changeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      onOverlayClick={props.onOverlayClick}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      name={'edit'}
      title={'Редактировать профиль'}
      form={'profile_edit'}
    >
      <input name="name" type="text" minLength="2" maxLength="40" 
      required id="name" placeholder="Имя" 
      className="popup__input popup__input_value_name"
      onChange={changeName} value={name || ''}
      />
      <span className="popup__input-error name-error"></span>
      <input name="about" type="text" minLength="2" maxLength="200" 
      required id="job" placeholder="Работа" 
      className="popup__input popup__input_value_job"
      onChange={changeDescription} value={description || ''}
      />
      <span className="popup__input-error job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;