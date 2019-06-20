const app = require('./app/bin/server')

const PORT = app.get('port')

app.listen(PORT, () => {
    console.log(`>>> Server running on port ${PORT}...`)
})