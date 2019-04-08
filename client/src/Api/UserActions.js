import axios from 'axios'

const register = user => {
  return axios.post('/register', {
    username: user.username,
    email: user.email,
    password: user.password
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

const login = user => {
  return axios.post('/login', {
    email: user.email,
    password: user.password
  })
  .then(res => {
    if (res.data.token) {
      localStorage.setItem('userToken', res.data.token)
      return res.data
    }

    if (res.data.error) {
      return res.data
    }
  })
  .catch(err => {
    console.log(err)
  })
}


export { register, login }
