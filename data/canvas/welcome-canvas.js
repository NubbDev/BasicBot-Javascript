const Canvas = require('@napi-rs/canvas');
const path = require('path');
const {AttachmentBuilder} = require('discord.js');
const { request } = require('undici');

const applyText = (canvas, text, initial) => {
    const ctx = canvas.getContext('2d');

    let fontSize = initial;

    do {
        ctx.font = `bold ${fontSize -= 10}px Source-Sans-Pro`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
}

const welcome = async(member, text, list) => {
    const canvas = Canvas.createCanvas(975, 410);
    const ctx = canvas.getContext('2d');
    const user = await member;
    Canvas.GlobalFonts.registerFromPath(path.join(__dirname, '..', 'source-sans-pro-semibold.ttf'), 'Source-Sans-Pro');
    
    console.log(Canvas.GlobalFonts.families)

    const background = await Canvas.loadImage('./data/image/welcome.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Adding Header Text
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = applyText(canvas, text, 35);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(await text, canvas.width / 2, canvas.height / 2 + 90);

    // Adding Secondary Text
    ctx.font = applyText(canvas, `You are member #${await list}. Make sure to read #rules`, 45);
    ctx.fillStyle = '#ccccccff';
    ctx.textAlign = 'center';
    ctx.fillText(`You are member #${await list}. Make sure to read #rules`, canvas.width / 2, canvas.height / 2 + 125);

    // Adding User Avatar Crop
    ctx.beginPath();
    ctx.arc((canvas.width / 2), (canvas.height / 2) - 50, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Adding User Avatar
    const {body} = await request(user.displayAvatarURL({dynamic: false, format: 'png'}))
    const avatar = await Canvas.loadImage(await body.arrayBuffer());
    ctx.drawImage(avatar, (canvas.width / 2) - 75, (canvas.height / 2) - 125 , 150 , 150);

    const attachment = new AttachmentBuilder(await canvas.encode('png'), {name: 'welcome.png', spoiler: false});
    return attachment;
}

module.exports = welcome;