import React from "react"

function ImagePopup(props) {
  React.useEffect(() => {
    if (props.card) {
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
  }, [props.card])

  return (
    <article className={`popup popup_form_fullscreen ${props.card ? 'popup_opened' : ''}`} onClick={props.onOverlayClick}>
      <div className="popup__fullscreen-container">
        <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} className="popup__image"/>
        <p className="popup__subtitle">{props.card ? props.card.name : ''}</p>
        <button type="button" className="popup__close-button" onClick={props.onClose}/>
      </div>
    </article>
  )
}

export default ImagePopup;