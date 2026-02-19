const { test, describe, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "onyangos",
      name: "Oguya",
      password: 'eiuwfhiwehjf'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('Creation of username with less characters in username',async () => {
    const usersAtTheBeginning = await User.find({})

    const newUser = {
      username: "ie",
      name: "onyango",
      password: "iweufhwejfwo"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtTheBeginning.length, usersAtEnd.length)
  })

  test('Creation of password with less characters', async () => {
    const usersAtTheBeginning = await User.find({})

    const newUser = {
      username: "Fredericko",
      name: "Fredrick",
      password: "er"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtTheEnd = await User.find({})
      assert.strictEqual(usersAtTheBeginning.length, usersAtTheEnd.length)
  })

  test('Creation of username with an existing username', async ()=> {
    const usersAtTheBeginning = await User.find({});

    const newUser = {
      username: 'root',
      name: 'Onyangi Ogi',
      password: "eihfiewjhf"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    const usersAtTheEnd = await User.find({})

    assert.strictEqual(usersAtTheBeginning.length,usersAtTheEnd.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

const info = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info, error
}
