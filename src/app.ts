import express from 'express'

const app = express()

app.use(express.json())
app.use('/', require('./routes/SignInRoute'))
app.use('/', require('./routes/SignUpRoute'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})