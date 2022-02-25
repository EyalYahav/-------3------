const router = require('express').Router()
const { onlyLoggedUsers, onlyAdmin } = require('../helpers/middlewares')
const { SQL } = require('../helpers/dbconfig')


// reports for admin
router.get('/reports', onlyAdmin, async (req, res) => {
    try {
        const follows = await SQL(`SELECT follows.vacation_id, vacations.destination from follows
        INNER JOIN vacations ON follows.vacation_id = vacations.vacation_id`)
        const numberOfFollows = follows.reduce((a, b) => {
            if (a[b.destination]) {
                a[b.destination]++
            } else {
                a[b.destination] = 1
            }
            return a
        }, {})
        return res.status(200).send({ numberOfFollows, follows })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//get vacations of user
router.get('/', onlyLoggedUsers, async (req, res) => {
    try {
        if (req.session.role == "admin") {
            const vacations = await SQL(`SELECT * FROM vacations`)
            return res.status(200).send(vacations)
        }

        const followedVacations = await SQL(`SELECT * FROM follows WHERE user_id = ${req.session.user_id}`)
        let fVacationArr = []
        for (const v of followedVacations) {
            fVacationArr.push(v.vacation_id)
        }
        await SQL(`UPDATE vacations SET isFollowed = 0 WHERE vacation_id > 0`)
        if (fVacationArr.length !== 0) {
            await SQL(`UPDATE vacations SET isFollowed = 1 WHERE vacation_id IN (${fVacationArr})`)
        }
        const vacations = await SQL(`SELECT vacations.* , follows.user_id from vacations 
        left JOIN follows on vacations.vacation_id = follows.vacation_id
        AND user_id = ${req.session.user_id} ORDER BY isFollowed DESC`)
        res.status(200).send(vacations)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

//handle follow
router.put('/handlefollow', onlyLoggedUsers, async (req, res) => {
    try {
        const { vacation_id } = req.body
        if (!vacation_id) {
            return res.status(400).send({ err: "missing some info" })
        }
        //unfollow
        const followed = await SQL(`SELECT * FROM follows`)
        if (followed.find(e => e.vacation_id == vacation_id && e.user_id == req.session.user_id)) {
            await SQL(`DELETE FROM follows
             WHERE vacation_id = ${vacation_id} AND user_id = ${req.session.user_id}`)
            await SQL(`UPDATE vacations
             SET isFollowed = 0  WHERE vacation_id = ${vacation_id}`)
            return res.status(200).send({ msg: "unfollowed" })
        }

        //follow
        await SQL(`INSERT INTO follows
        VALUES (${req.session.user_id + "," + vacation_id})`)
        await SQL(`UPDATE vacations
        SET isFollowed = 1  WHERE vacation_id = ${vacation_id}`)
        res.status(200).send({ msg: "followed successfully" })


    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//add-edit vacation
router.post('/vacation', onlyAdmin, async (req, res) => {
    try {
        const { id, description, destination, image, fromDate, untilDate, price } = req.body
        if (!description || !destination || !image || !fromDate || !untilDate || !price) {
            return res.status(400).send({ err: "Missing some info" })
        }
        //edit vacation
        const vacation = await SQL(`SELECT vacation_id FROM vacations`)
        if (vacation.find(e => e.vacation_id == id)) {
            await SQL(`UPDATE vacations SET
             description = "${description}",
             destination = "${destination}",
             image = "${image}",
             fromDate = "${fromDate}",
             untilDate = "${untilDate}",
             price = ${price}
              WHERE vacation_id = ${id}`)

            return res.status(200).send({ msg: "vacation edited successfully" })
        }
        //add vacation
        await SQL(`INSERT INTO vacations (description, destination, image, fromDate, untilDate, price, isFollowed)
        VALUES ("${description}", "${destination}", "${image}", "${fromDate}", "${untilDate}", ${price}, 0)`)
        res.status(200).send({ msg: "vacation added successfully", vacation })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


//delete vacation
router.delete('/', onlyAdmin, async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({ err: "missing some info" })
        }
        await SQL(`DELETE FROM follows WHERE vacation_id = ${id}`)
        await SQL(`DELETE FROM vacations WHERE vacation_id = ${id}`)
        res.status(200).send({ msg: "vacation deleted successfully" })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})





module.exports = router