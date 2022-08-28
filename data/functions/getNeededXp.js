const getNeededXp = (lvl, xp) => {
    return (((5 * (lvl * lvl) + (50 * lvl)) + 100) - xp)
}
module.exports = getNeededXp;