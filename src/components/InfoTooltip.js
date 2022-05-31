function InfoTooltip(props) {
  return(
    <article className={`popup ${props.isOpen ? `popup_opened`: ""}`} onClick={props.onOverlayClick}>
      <div className="popup__container">
          <img src={props.photo} alt="Картинка" className="popup__photo"/>
          <h2 className="popup__title popup__title_info">{props.title}</h2>
          <button type="button" className="popup__close-button" onClick={props.onClose}/>
      </div>
    </article>
  )
}

export default InfoTooltip