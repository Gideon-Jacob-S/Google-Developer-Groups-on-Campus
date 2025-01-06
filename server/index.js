const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 5000
const dbPath = path.join(__dirname, 'gdg_members.db')
const secretKey = process.env.SECRET_KEY || "ap#sdi!o^feri(ojkl#dfiqr:yh"
let db = null

// only on deployment
// app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

const initializeServerAndDB = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  }).catch(err => {
    console.log(`DB Error: ${err}`)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

app.post('/api/signup', async (request, response) => {
  const {username, password, email, collegeId, userType = 'USER'} = request.body
  let [isUsernameExists, isEmailExists, isCollegeIdExists] = [
    false,
    false,
    false,
  ]
  let isInvalidRequest = false

  // check if collegeId alredy exists
  const getCollegeIdQuery = `
    SELECT *
    FROM users
    WHERE college_id="${collegeId}";`
  let dbResponse = await db.get(getCollegeIdQuery)

  if (dbResponse !== undefined) {
    isCollegeIdExists = true
    isInvalidRequest = true
  }

  // check if email alredy exists
  const getEmailQuery = `
    SELECT *
    FROM users
    WHERE email="${email}";`
  dbResponse = await db.get(getEmailQuery)

  if (dbResponse !== undefined) {
    isEmailExists = true
    isInvalidRequest = true
  }

  // check if username alredy exists
  const getUsernameQuery = `
    SELECT *
    FROM users
    WHERE username="${username}";`
  dbResponse = await db.get(getUsernameQuery)

  if (dbResponse !== undefined) {
    isUsernameExists = true
    isInvalidRequest = true
  }

  if (isInvalidRequest) {
    response.status(400)
    response.send({isUsernameExists, isEmailExists, isCollegeIdExists})
    return
  }

  // Add user details to Database
  const encryptedPassword = await bcrypt.hash(password, 12)
  const createUserQuery = `
    INSERT INTO users (username, password, email, college_id, user_type)
    VALUES (
      "${username}",
      "${encryptedPassword}",
      "${email}",
      "${collegeId}",
      "${userType}"
    );`

  await db.run(createUserQuery)
  response.send({
    message: 'Account created successfully.',
  })
})

app.post('/api/login', async (request, response) => {
  const {username, password} = request.body
  const getUserDetailsQuery = `SELECT * FROM users WHERE username="${username}";`
  const userDetails = await db.get(getUserDetailsQuery)

  if (userDetails === undefined) {
    response.status(400)
    response.send({
      errMsg: 'Invalid username',
    })
    return
  }

  const {password: dbPassword, user_type: userType} = userDetails
  const isPasswordEqual = await bcrypt.compare(password, dbPassword)
  if (!isPasswordEqual) {
    response.status(400)
    response.send({
      errMsg: 'Invalid password',
    })
  } else {
    const payload = {username}
    const jwtToken = jwt.sign(payload, secretKey)
    response.send({jwtToken, userType})
  }
})

app.get('/api/isadmin', (request, response) => {
  const authHeader = request.headers['authorization']

  if (authHeader === undefined) {
    response.status(401)
    response.send({
      errMsg: 'Add authorization in your headers.',
    })
    return
  }

  const jwtToken = authHeader.split(' ')[1]
  jwt.verify(jwtToken, secretKey, async (error, payload) => {
    if (error !== null) {
      response.status(401)
      response.send({
        errMsg: 'Invalid JWT Token',
      })
      return
    }

    const getUserDetailsQuery = `SELECT * FROM users WHERE username="${payload.username}";`
    const userDetails = await db.get(getUserDetailsQuery)

    if (userDetails.user_type !== 'ADMIN') {
      response.send({isAdmin: false})
    } else {
      response.send({isAdmin: true})
    }
  })
})

app.get('/api/test', (req, res) => {
  const authHeader = req.headers['authorization']
  res.send({data: 'Success', authHeader})
})

// only on deployment
// app.get('*', (request, response) => {
//   response.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

initializeServerAndDB()
