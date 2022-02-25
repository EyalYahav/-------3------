const router = require('express').Router()
const { SQL } = require('../helpers/dbconfig')

//register
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body
        //make sure user gave all needed info
        if (!firstname || !lastname || !username || !password) {
            return res.status(400).send({ err: "Missing some info" })
        }

        const users = await SQL(`SELECT * FROM users;`)
        // make sure username is free

        if (users.some(user => user.username == username)) {
            return res.status(400).send({ err: "Username already taken" })
        }

        //save the user
        await SQL(`INSERT INTO users (firstName, lastName, username, password)
        VALUES ("${firstname}", "${lastname}", "${username}", "${password}");`)

        //answer
        res.status(200).send({ msg: "account created, please login" })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        //make sure user gave all needed info
        if (!username || !password) {
            return res.status(400).send({ err: "Missing some info" })
        }
        // make sure info is true
        const users = await SQL(`SELECT * FROM users;`)
        const user = users.find(user => user.username == username && user.password == password)

        // find the specific user from database
        if (!user) {
            return res.status(400).send({ err: "Wrong username or password" })
        }

        //save the details in the session array
        req.session.username = username
        req.session.role = user.role
        req.session.user_id = user.user_id
        res.status(200).send({ msg: user.role + " " + username + " " + "logged in successfully", username, role: user.role })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session) {
        
            req.session.destroy((err)=>{
                if (err) {
                    res.status(400).send({err: "unable to log out"})
                    
                } else {
                    res.status(200).send({msg: "logget out successfully"})
                    
                }
            })
            
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})



module.exports = router