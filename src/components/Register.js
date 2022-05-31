import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [mail, setMail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleMailChange(evt) {
    setMail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister(mail, password)
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
          <input
              type="email"
              className="login__input"
              placeholder="Email"
              onChange={handleMailChange}
          />
          <input
              type="password"
              className="login__input"
              placeholder="Пароль"
              onChange={handlePasswordChange}
          />
          <button type="submit" className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
    </section>
  )
}

export default Register