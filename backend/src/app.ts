import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)

export default app
