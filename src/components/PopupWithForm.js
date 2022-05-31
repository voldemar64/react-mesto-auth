import React from "react"

function PopupWithForm(props) {

  React.useEffect(() => {
    if (props.isOpen) {
      function handleEscClose(e) {
        if (e.key === 'Escape') {
          props.onClose()
        }
      }

      document.addEventListener('keydown', e => {
        handleEscClose(e)
      })

      return (
        document.removeEventListener('keydown', e => {
          handleEscClose(e)
        })
      )
    }
  }, [[props.isOpen]])
  return (
    <article className={`popup popup_form_${props.name} ${props.isOpen ? `popup_opened` : ''}`} onClick={props.onOverlayClick}>
      <form name={props.form} action="#" onSubmit={props.onSubmit} className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__submit-button">{props.buttonText}</button>
        <button type="button" className="popup__close-button" onClick={props.onClose}/>
      </form>
    </article>
  )
}

export default PopupWithForm;