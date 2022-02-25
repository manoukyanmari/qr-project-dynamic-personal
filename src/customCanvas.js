const { registerFont, createCanvas, loadImage } = require('canvas')
registerFont('assets/Hermes-RegularCond.otf', { family: 'Hermes' });
const canvas = createCanvas(280, 360)
const ctx = canvas.getContext('2d');
const helpers = require('./helpers');

/**
 * Create a template with a text
 * @param src image source of already created QR to use for the template
 * @param settings text, colors
 * @param createRectangleWithBorderRadius
 * @returns {NodeCanvasRenderingContext2D}
 */
const makeATemplate = async (src, settings, createRectangleWithBorderRadius) => {
    //Base64 of the QR
    let base64 = helpers.decodeBase64Image(src);

    // Rectangle with a transparent background
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Round cornered rectangle for QR wrap-up
    ctx.lineWidth = 4;
    ctx.strokeStyle = settings.colors.borderColor.toString();
    ctx.fillStyle = settings.colors.bgColor.toString();
    let x = Math.floor(ctx.lineWidth / 2);
    let y = Math.floor(ctx.lineWidth / 2);
    createRectangleWithBorderRadius(canvas, x, y, canvas.width - ctx.lineWidth, canvas.height - ctx.lineWidth, settings.borderRadius, true, true);

    ctx.textAlign = "center";
    // ctx.shadowColor = "#fff";
    ctx.fillStyle = settings.colors.textColor.toString();

    // Set up the font and text
    // First text setup
    ctx.font = settings.text1.font;
    ctx.fillText(settings.text1.content,128, 314)
    // Logo-text Setup
    ctx.font = settings.text2.font;
    ctx.fillText(settings.text2.content,208, 314)

    await loadImage(base64.data).then((image) => {
        ctx.drawImage(image, canvas.width / 2 - image.width / 2,
            15, 252, 252)
        ctx.textAlign = 'center';
    })
    let data = canvas.toDataURL();
    return helpers.decodeBase64Image(data);
}

module.exports = {
    makeATemplate
}

