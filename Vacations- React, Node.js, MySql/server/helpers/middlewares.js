const onlyLoggedUsers = (req,res,next)=>{
    if (req.session.username) {
        next()
    } else {
        res.status(401).send({err: "sensetive content, please login"})

    }

}
const onlyAdmin = (req,res,next)=>{
    if (req.session.role == "admin") {
        next()
    } else {
        res.status(401).send({err: "only admin allowed here"})

    }

}

module.exports = {onlyLoggedUsers, onlyAdmin}