export class LevelController {

    // todo: Add tracking. Jag vill att det ska vara möjligt att tracka och lägga till saker till goals. 
    // så är ett mål, viktnedgång ska man kunna lägga in vikt. eller om ett mål är sprungna km. 
    // ska man kunna lägga till de också. 
    // Sen vill jag att det ska finnas rewards för varje uppfyllt mål också. 
    index (req, res, next) {
        try {
            const user = req.session.user
            const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const currentDate = new Date()
            const day = currentDate.getDate()
            const weekDay = currentDate.getDay()
            const month = currentDate.getMonth()
            const monthString = monthNames[month]
            const date = `${day} ${monthString} ${weekDays[weekDay]}`
            const contentType = 'level'
            const rewards = user.rewards
            const goals = user.goals
            const name = user.name
            const username = user.username
            const mail = user.email
            const xp = user.xp
            const level = user.level
            const longestStreak = user.longestStreak
            const streak = user.streak
            const levelxp = user.levelxp
            const levelIncrease = user.levelIncrease
            const basexpToLevel = user.basexpToLevel

            let xpForNextLevel = basexpToLevel * Math.pow(levelIncrease, level);
            let xpPercentage = (levelxp / xpForNextLevel) * 100;

            // TODO: Sök efter goals och rewards. 

            // TODO: Se hur ofta man vill öka level. Typ när man nått level multiplicera existerande nivå med 1,1 typ. 
            // TODO: bör level liksom bara läggas på varandra eller "nollställas" per level. 
            // Ide kan vara att de nollställs i level tab men att man i account alltid kan se total xp.
            res.render('level/index', { type: contentType, basexpToLevel, levelIncrease, level, levelxp, xpForNextLevel, xpPercentage, date, rewards, goals })
        } catch (err) {
            next(err)
        }
    }
}