const Canvas = require('@napi-rs/canvas');
const {AttachmentBuilder} = require('discord.js');
const { request } = require('undici');
const getNeededXp = require('../functions/getNeededXp.js');
const abbrNum = require('../functions/abbrNum.js');
const rSquare = require('../functions/roundedSqr.js');

const applyText = (canvas, text, initial) => {
    const ctx = canvas.getContext('2d');

    let fontSize = initial;

    do {
        ctx.font = `bold ${fontSize -= 5}px Source Sans Pro`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
}

const rankImage = async(member, level, xp, pos) => {
    const canvas = Canvas.createCanvas(975, 340);
    const ctx = canvas.getContext('2d');
    const user = await member;
    const userPos = await abbrNum(pos, 2);
    const getNeededXP = await getNeededXp(level, 0);
    const neededXp = await abbrNum(getNeededXP, 2) 
    const userXp = await abbrNum(xp, 2);
    const maxLength = 610;

    const xpLength = await ((xp/getNeededXP) * maxLength)

    const background = await Canvas.loadImage('./data/image/rank.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Adding Background Bar
    ctx.beginPath();
    ctx.fillStyle = '#434343ff';
    rSquare(ctx, (canvas.width / 3) - 30, (canvas.height * (4/5)) - 25, maxLength, 15, 7.5, true, false);
    ctx.fill()
    ctx.closePath()

    // Adding Xp Bar
    ctx.beginPath();
    ctx.fillStyle = '#ffd966ff';
    rSquare(ctx, (canvas.width / 3) - 30, (canvas.height * (4/5)) - 25, xpLength, 15, 7.5, true, false);
    ctx.fill()
    ctx.closePath()

    // Adding Name
    ctx.font = applyText(canvas, `${await user.username}#${await user.discriminator}`, 40);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom'
    ctx.fillText(`${await user.username}#${await user.discriminator}`, (canvas.width / 3) - 30, (canvas.height * (3/5)));

    // Adding Position
    ctx.font = applyText(canvas, `#${await userPos}`, 70);
    ctx.fillStyle = '#ffd966ff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom'
    ctx.fillText(`#${await userPos}`, ((canvas.width) * (2/3)) + 35, (canvas.height / 5) + 10);

    // Adding Level
    ctx.font = `bold 70px Source Sans Pro`;
    ctx.fillStyle = '#ffd966ff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom'
    ctx.fillText(`${await level}`, canvas.width - 109, (canvas.height / 5) + 10);

    // Adding xp
    ctx.font = applyText(canvas, `${await userXp} `, 45);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom'
    ctx.fillText(`${await userXp} `, (canvas.width) - 150, (canvas.height * (3/5)));

    // Adding needed xp
    ctx.font = applyText(canvas, `/ ${await neededXp}`, 45);
    ctx.fillStyle = '#ccccccff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom'
    ctx.fillText(`/ ${await neededXp}`, (canvas.width) - 150, (canvas.height * (3/5)));

    // Adding User Avatar Crop
    ctx.beginPath();
    ctx.arc((canvas.width / 6) + 10, (canvas.height / 2), 75, 0, Math.PI * 2, true);
    // ctx.fillStyle = '#ffffff';
    // ctx.fill();
    ctx.closePath();
    ctx.clip();

    // Adding User Avatar
    const {body} = await request(user.displayAvatarURL({dynamic: false, format: 'png'}))
    const avatar = await Canvas.loadImage(await body.arrayBuffer());
    ctx.drawImage(avatar, (canvas.width / 10), (canvas.height / 4) + 11, 150 , 150);

    const attachment = new AttachmentBuilder(await canvas.encode('png'), {name: `${user.username + user.discriminator}_rank.png`, spoiler: false});
    return attachment;
}

module.exports = rankImage;