import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('')
  const [link, setLink]= React.useState('')

  React.useEffect(() => {
    if (props.isOpen) {
      setTitle('')
      setLink('')
    }
  }, [props.isOpen])

  function changeTitle(e) {
    setTitle(e.target.value)
  }

  function changeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: title,
      link: link
    });
  }

  return(
    <PopupWithForm
      onOverlayClick={props.onOverlayClick}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
      name={'add'}
      title={'Новое место'}
      form={'add_pic'}
    >
      <input name="name" type="text" minLength="2" maxLength="30" 
      required id="title" placeholder="Название" 
      className="popup__input popup__input_value_title"
      onChange={changeTitle}
      />
      <span className="popup__input-error title-error"></span>
      <input name="link" type="url" required id="link" 
      placeholder="Ссылка на картинку" 
      className="popup__input popup__input_value_link"
      onChange={changeLink}
      />
      <span className="popup__input-error link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;