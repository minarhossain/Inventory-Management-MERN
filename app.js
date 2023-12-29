const express = require('express');
const customPath = require('node:path');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser')
const hpp = require('hpp');
const router = require('./src/routes/api');


const app = express();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, max: 3000 });
app.use(limiter);

// Assuming path is supposed to be a string
if (typeof customPath === 'string') {
    customPath = '^' + customPath + (strict ? '' : (customPath[customPath.length - 1] === '/' ? '?' : '/?'));
} else {
    // Handle the case where path is not a string
    console.log('Path is not a valid string:');
}



// routing import
app.use('/api/v1', router)

app.get('/api', (req, res) => {
    res.json({ status: "Hello Inventory" });
});


// undefined route implement
app.use('*', (req, res) => {
    res.status(404).json({ status: 'Fail', data: "Routes not found." })
})
module.exports = app;