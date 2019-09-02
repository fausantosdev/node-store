require('dotenv').config()

const jwt = require('jsonwebtoken')

// Middlewares de autenticação.

exports.generatedToken = async data => {// Gera o token com os dados e a chave secreta da api.
  let token = jwt.sign(data, process.env.API_KEY, { expiresIn: '1d' })
  // ↑↑↑ Dados, chave secreta, tempo de expiração.
  return token
}

exports.decodeToken = async token => {// Decodifica o token.
  let data = await jwt.verify(token, process.env.API_KEY)
  // Dados, chave secreta.
  return data
}

// Autenticação*
exports.authorize = (req, res, next) => {// Interceptador, será usado nas rotas bloqueadas.
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {// Se não tiver token.
    res.status(401).json({
      message: 'Acesso restrito!'
    })
  } else {
    jwt.verify(token, process.env.API_KEY, (error, decoded) => {
      if (error) {// Se o token for inválido.
        res.status(401).json({
          message: 'Token inválido!'
        })
      }
      else {
        next()// Se for certo prossiga.
      }
    })
  }
}

// Autorização*
exports.isAdmin = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {// Se não tiver token.
    res.status(401).json({
      message: 'Acesso restrito!'
    })
  } else {
    jwt.verify(token, process.env.API_KEY, (error, decoded) => {// Decoded já é o token decodificado.
      if (error) {// Se o token for inválido.
        res.status(401).json({
          message: 'Token inválido!'
        })
      } else {
        if (decoded.roles.includes('admin')) {// Verifica se existe a string admin* dentro do array roles.
          next()
        } else {
          res.status(403).json({
            message: 'Essa funcionalidade é restrita para administradores!'
          })
        }
      }
    })
  }
}