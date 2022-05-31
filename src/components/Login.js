import React from "react";

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
    props.onLogin(mail, password)
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
          <input
              required
              type="email"
              className="login__input"
              placeholder="Email"
              onChange={handleMailChange}
          />
          <input
              required
              type="password"
              className="login__input"
              placeholder="Пароль"
              onChange={handlePasswordChange}
          />
          <button type="submit" className="login__button">Войти</button>
      </form>
    </section>
  )
}

export default Register