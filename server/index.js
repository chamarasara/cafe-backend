const express = require('express')
const Routes = require('./routes')
const cors = require('cors');
const bodyParser =  require('body-parser');
const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json());
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use('/api/', Routes);


app.listen(PORT, err => {
    if (err) {
        console.error(`👽 We have a problem : ${err} ☠️`);
    } {
        console.log(`🎉 APP Listen to port: ${PORT} 🎉`);
    }
});