const exp = require('express')
const session = require('express-session')
const cors = require('cors')
const { SQL } = require('./helpers/dbconfig')
const app = exp()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 

}))
app.use(exp.json())
app.use(session({
    secret: "MyProjectIsLitWoohoo",
    name:"session",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60*24*365,
        sameSite: 'lax'
    }
    
}))

app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))




app.listen(1000, _ => console.log("rocking 1000 vacationSite Good Luck!"))
