import express from 'express'

const app = express()

app.use(express.json())
app.use('/', require('./routes/SignInRoute'))
app.use('/', require('./routes/SignUpRoute'))

app.listen(3000)