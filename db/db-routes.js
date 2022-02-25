const db = require('./queries');
// Simple routing to the index.ejs file
module.exports = function(app) {
    app.get('/qr', db.getImages)
    app.get('/qr/:url', db.getImageByURL)
    app.post('/qr', db.createQRImage)
    app.put('/qr/:url', db.updateQRImage)
    app.delete('/qr/:id', db.deleteQRImage)
}