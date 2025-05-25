import { AuthModel } from '../models/AuthModel.js'
export class AccountController {
    index (req, res, next) {
        try {
            const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const currentDate = new Date()
            const day = currentDate.getDate()
            const weekDay = currentDate.getDay()
            const month = currentDate.getMonth()
            const monthString = monthNames[month]
            const date = `${day} ${monthString} ${weekDays[weekDay]}`
            const contentType = 'acc'
            const name = req.session.user.name
            const username = req.session.user.username
            const mail = req.session.user.email
            const xp = req.session.user.xp
            console.log(req.session.user)

            res.render('account/index', { type: contentType, date, username, mail, xp, name })
        } catch (err) {
            next(err)
        }
    }


    async addGoals (req, res, next) {
         // TODO: OM någon lägger till task på två enheter. Hämta om tasks eller? 
         try {
            let existingGoals = req.session.user.goals || [];
            let updatedGoals = [...existingGoals];
    
            // Add the new reward from the request body
            updatedGoals.push(req.body.goal);
    
            // Update in database
            await AuthModel.updateOne(
                { username: req.session.user.username },
                { goals: updatedGoals }
            );
    
            // Update session
            req.session.user.goals = updatedGoals;
    
            // Send response back to the client
            res.redirect('/level')
        } catch (error) {
            console.error("Error adding reward:", error);
            next(error); // Let your global error handler deal with it
        }
    }


    async addRewards (req, res, next) {
        // TODO: OM någon lägger till task på två enheter. Hämta om tasks eller? 
        // Task ska läggas till i både databas och session.
        // Reward läggs till i listan och visas på skärmen. :) 
            try {
                let existingRewards = req.session.user.rewards || [];
                let updatedRewards = [...existingRewards];
        
                // Add the new reward from the request body
                updatedRewards.push(req.body.reward);
        
                // Update in database
                await AuthModel.updateOne(
                    { username: req.session.user.username },
                    { rewards: updatedRewards }
                );
        
                // Update session
                req.session.user.rewards = updatedRewards;
        
                // Send response back to the client
                res.redirect('/level')
            } catch (error) {
                console.error("Error adding reward:", error);
                next(error); // Let your global error handler deal with it
            }
        
    }
}