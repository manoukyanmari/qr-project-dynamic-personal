const QRCode = require("easyqrcodejs-nodejs");

/**
 * Decode base64 string to have in chunks
 * @param dataString
 * @returns {Error|{}}
 */
const decodeBase64Image = (dataString) => {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    return response;
}

/**
 * QR code instance via desired customizable params
 * @param url
 * @returns {QRCode}
 */
const initializeQRCodeInstance = (url) => {

    let options = {
        // ====== Basic
        text: url,
        colorDark : "#000000",
        colorLight : "#ffffff",
        width: 245,
        height: 245,
        correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
        dotScale: 0.4, // For body block, must be greater than 0, less than or equal to 1. default is 1
        dotScaleTiming: 0.8, // Dafault for timing block , must be greater than 0, less than or equal to 1. default is 1
        dotScaleTiming_H: 0.8, // For horizontal timing block, must be greater than 0, less than or equal to 1. default is 1
        dotScaleTiming_V: 0.8, // For vertical timing block, must be greater than 0, less than or equal to 1. default is 1
        dotScaleA: 0.5, // Dafault for alignment block, must be greater than 0, less than or equal to 1. default is 1
        dotScaleAO: 0.7, // For alignment outer block, must be greater than 0, less than or equal to 1. default is 1
        dotScaleAI: 0.7, // For alignment inner block, must be greater than 0, less than or equal to 1. default is 1
        quietZone: 10,
        quietZoneColor: "#ffffff",
        logo: "./assets/logo.png", // Relative address, relative to `easy.qrcode.min.js`
        logoWidth: 60, // fixed logo width. default is `width/3.5`
        logoHeight: 60, // fixed logo height. default is `heigth/3.5`
        logoMaxWidth: 80, // Maximum logo width. if set will ignore `logoWidth` value
        logoMaxHeight: 80, // Maximum logo height. if set will ignore `logoHeight` value
        logoBackgroundColor: '#292929', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
        logoBackgroundTransparent: false, // Whether use transparent image, default is false
        // ====== Colorful
        PO: '#000000', // Global Posotion Outer color. if not set, the defaut is `colorDark`
        PI: '#000000', // Global Posotion Inner color. if not set, the defaut is `colorDark`
        PO_TL: '#000000', // Posotion Outer color - Top Left
        PI_TL: '#000000', // Posotion Inner color - Top Left
        PO_TR: '#000000', // Posotion Outer color - Top Right
        PI_TR: '#000000', // Posotion Inner color - Top Right
        PO_BL: '#000000', // Posotion Outer color - Bottom Left
        PI_BL: '#000000', // Posotion Inner color - Bottom Left
        // === Alignment Color
        AI: '#000000', // Alignment Inner. if not set, the defaut is `colorDark'
        AO: '#000000', // Alignment Outer. if not set, the defaut is `colorDark`
        // === Timing Pattern Color
        timing: '#000000', // Global Timing color. if not set, the defaut is `colorDark`
        timing_H: '#000000', // Horizontal timing color
        timing_V: '#000000', // Vertical timing color
        format: 'PNG', // 'PNG', 'JPG'
        compressionLevel: 6, // ZLIB compression level (0-9). default is 6
        version: 0, // The symbol versions of QR Code range from Version 1 to Version 40. default 0 means automatically choose the closest version based on the text length.
        utf8WithoutBOM: true
    }

    // New instance with options
    return new QRCode(options);
}

/**
 *
 * @param canvas pass the already created canvas
 * @param x The top left x coordinate
 * @param y The top left y coordinate
 * @param width width The width of the rectangle
 * @param height height The height of the rectangle
 * @param radius The corner radius; Default is 5
 * @param stroke Whether to stroke the rectangle.
 * @param fill Whether to fill the rectangle.
 * @returns {NodeCanvasRenderingContext2D}
 */
const createRectangleWithBorderRadius = (canvas, x, y, width, height, radius, stroke, fill) => {
    const ctx = canvas.getContext('2d')

    if(typeof radius === 'undefined') {
        radius = 5;
    }
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    if(stroke) {
        ctx.stroke();
    }
    if(fill) {
        ctx.fill();
    }
    return ctx;
}

module.exports = {
    decodeBase64Image,
    initializeQRCodeInstance,
    createRectangleWithBorderRadius
}

