const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getImages = (request, response) => {
    pool.query('SELECT * FROM qr_generated ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getImageByURL = (request, response) => {
    const uri = parseInt(request.params.url)
    pool.query('SELECT * FROM qr_generated WHERE url = uri', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createQRImage = (request, response) => {
    const { url, img } = request.body;
    pool.query('INSERT INTO qr_generated (url, img) VALUES ($1, $2)', [url, img], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.id}`)
    })
}

const updateQRImage = (request, response) => {
    const url = parseInt(request.params.url)
    const { img } = request.body

    pool.query(
        'UPDATE users SET img = $1 WHERE url = $2',
        [img, url],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`QR modified with ID: ${url}`)
        }
    )
}

const deleteQRImage = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getImages,
    getImageByURL,
    createQRImage,
    updateQRImage,
    deleteQRImage,
}