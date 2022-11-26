import express from 'express'
import { router } from './routes/SignUpRoute'

const app = express()

app.use(express.json())
app.use(require('routes/SignUpRoute'))
app.use(require('routes/SignInRoute'))

app.listen(3000)