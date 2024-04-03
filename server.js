
import express from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/*', function(req, res) {
    console.log('path', path.join(process.cwd(), '/dist/index.html'))
    res.sendFile(path.join(process.cwd(), '/dist/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(path.join(process.cwd(), '/dist'))
    console.log(`Server on ${PORT}...`);
})