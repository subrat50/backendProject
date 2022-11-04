const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');

const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// J5KZdyPESpTonYrn-pass
// "mongodb+srv://Subrat234:J5KZdyPESpTonYrn@subrat.itbbfc9.mongodb.net/backendproject"
mongoose.connect("mongodb+srv://Subrat234:J5KZdyPESpTonYrn@subrat.itbbfc9.mongodb.net/backendproject", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected")) // asynchronous behaviour
    .catch(err => console.log(err))

app.use('/', route)


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});