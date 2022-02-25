const customCanvas = require('./customCanvas');

module.exports = function(app, helpers) {
// Simple routing for retrieving the image
    app.get("/", (req, res) => {
        const url = req.query.url;
        //In case if the url is empty
        if (!url || typeof url === 'undefined' || !url.length) {
            res.end("Empty Data!");
        } else {
            let qrcode = helpers.initializeQRCodeInstance(url);
            // Get standard base64 image data url text: 'data:image/png;base64, ...'
            qrcode.toDataURL().then(src => {
                let settings = {
                    text1: {content: 'Pay by Bank', font: '20px Hermes'},
                    text2: {content: ':', font: '32px Hermes'},
                    colors: {borderColor: '#646464', textColor: '#292929', bgColor: '#fff'},
                    borderRadius: 8
                };
                customCanvas.makeATemplate(src, settings, helpers.createRectangleWithBorderRadius).then((result)=> {
                    res.end(result.data);
                });
            });
        }
    });
}