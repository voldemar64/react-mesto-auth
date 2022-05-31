import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });

    avatarRef.current.value=''
  }
  return(
    <PopupWithForm
      onOverlayClick={props.onOverlayClick}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      name={'avatar'}
      title={'Обновить аватар'}
      form={'avatar'}
    >
      <input name="avatar" type="url" minLength="2" required 
      id="avatar" placeholder="Ссылка на картинку" 
      className="popup__input popup__input_value_avatar"
      ref={avatarRef}
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;