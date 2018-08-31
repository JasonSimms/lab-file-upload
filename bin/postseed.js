const mongoose = require('mongoose')
const Posts = require('../models/posts')

const dbName = 'tumblr-lab-development'
mongoose.connect(`mongodb://localhost/${dbName}`)

const posts = [
    {
        content: 'some content',
        creatorId: 'Notyoda',
        picPath: 'not a picutre',
        picName: 'not a pic name',
      },
      {
        content: 'some content',
        creatorId: 'Notyoda',
        picPath: 'not a picutre',
        picName: 'not a pic name',
      },
      {
        content: 'some content',
        creatorId: 'Notyoda',
        picPath: 'not a picutre',
        picName: 'not a pic name',
      },
      {
        content: 'some content',
        creatorId: 'Notyoda',
        picPath: 'not a picutre',
        picName: 'not a pic name',
      },
]

Posts.create(posts, err => {
    if (err) {
        throw err
    }
    console.log(`Created ${posts.length} posts`)
    mongoose.connection.close()
})