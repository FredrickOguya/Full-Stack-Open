const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = listHelper.favoriteBlog

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result,1)
})

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

describe('Total likes', () => {

  test('of empty array is zero', () => {
    assert.strictEqual(totalLikes([]),0)
  })

  test('of when list has only one blog equals to the likes of that blog', () => {
    assert.strictEqual(totalLikes(listWithOneBlog), listWithOneBlog[0].likes)
  })

  test('of a bligger list is calculated right', () => {
    assert.strictEqual(totalLikes(blogs), 36)
  })
})

describe('Favourite blog', () => {
  test('of an empty array is zero',() => {
    assert.strictEqual((favouriteBlog([])), 0)
  })

  test('of one blog is the blog', () => {
    assert.strictEqual((favouriteBlog(listWithOneBlog)),listWithOneBlog[0])
  })

  test('of list of many blogs is the blogs with most likes',  () => {
    assert.strictEqual((favouriteBlog(blogs)),blogs[2])
  })
})