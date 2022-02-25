const axios = require("axios");

const createImage = (url, imageBuffer) => {
    axios
        .post('/qr', {
            url: url,
            img: imageBuffer
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            console.error(error)
        })
}

const getImage = (url, src) => {
    axios.get(`/qr?url=${url}`)
        .then(function (response) {
            // handle success
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            this.createImage(url, src);
        })
}

module.exports = {
    createImage,
    getImage,
}