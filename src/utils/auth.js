export const BASE_URL = 'https://auth.nomoreparties.co'

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({password: password, email: email})
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .catch(err => console.log(`не удалось зарегистрироваться: ${err}`))
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
        "Content-Type": "application/json",
    },
    body: JSON.stringify({password: password, email: email})
})
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .catch(err => console.log(`не удалось авторизоваться: ${err}`))
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .catch(err => console.log(err))
}