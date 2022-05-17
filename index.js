const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use("cors", cors());

app.set('port', port);

require("./src/routes/user.router")(app);
require("./src/routes/employee.route")(app);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running  https://localhost:${port}`);
        });
    }).catch(err => {
        console.log(err);
        process.exit()
    })


app.get('/', (req, res) => {
    res.json("Welcome to the API");
})

