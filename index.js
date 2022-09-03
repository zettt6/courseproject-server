const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const collectionsRouter = require('./routes/collections')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const itemRouter = require('./routes/item')
const commentsRouter = require('./routes/comments')

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/collections', collectionsRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/items', itemRouter)
app.use('/comments', commentsRouter)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://zet6:123@cluster0.zwkapco.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
