import api from './connectionProxy'

export const login = ({ ca_usu_login, ca_usu_cripto }) => {
  return api.http.post('/auth', {
    ca_usu_login,
    ca_usu_cripto
  })
}

export const resetPasswordByEmail = email => {
  return api.http.post('/auth/reset_password', {
    email
  })
}

export const resetPassword = ({ ca_usu_cripto, token }) => {
  return api.http.put(`/auth/reset_password/${token}`, {
    ca_usu_cripto
  })
}

// export const refreshToken = token => {
//   return api.http.post(`/auth/refresh_token`, {
//     refreshToken: token
//   })
// }

export const logout = () => {
  return new Promise((resolve, reject) => {
    resolve('ok')
  })
}