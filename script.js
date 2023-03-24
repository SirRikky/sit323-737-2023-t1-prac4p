const express = require("express");
const res = require("express/lib/response");
const app = express();
const winston = require("winston")
const port = 3040;

// Calculator functions

// Validates input as numbers
const verifyNumbers = (n1, n2) => {
    if(isNaN(n1)){
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)){
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
}

// Calculator maths functions
const add = (n1, n2) => {
    return n1+n2;
}
const subtract = (n1, n2) => {
    return n1-n2;
}
const multiply = (n1, n2) => {
    return n1*n2;
}
const divide = (n1, n2) => {
    return n1/n2;
}

// Winston logging 
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-service'},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined.log'})
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    }));
}

// Calculator endpoints

// Add endpoint adds 2 numbers
// Example command to make the app work
// http://localhost:3040/add?n1=1&n2=3
app.get("/add", (req,res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        verifyNumbers(n1, n2)

        const result = add(n1,n2);
        res.status(200).json({statuscode:200, data: result});

    } catch (error) {
        console.error(error)
        res.status(500).json({statuscode: 500, msg: error.toString() })
    } 
});

// Subtract endpoint subtracts the second number from the first
// Example command to make the app work
// http://localhost:3040/subtract?n1=1&n2=3
app.get("/subtract", (req,res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
        verifyNumbers(n1, n2)

        const result = subtract(n1,n2);
        res.status(200).json({statuscode:200, data: result});

    } catch (error) {
        console.error(error)
        res.status(500).json({statuscode: 500, msg: error.toString() })
    } 
});

// Multiply endpoint multiplies 2 numbers
// Example command to make the app work
// http://localhost:3040/multiply?n1=1&n2=3
app.get("/multiply", (req,res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
        verifyNumbers(n1, n2)

        const result = multiply(n1,n2);
        res.status(200).json({statuscode:200, data: result});

    } catch (error) {
        console.error(error)
        res.status(500).json({statuscode: 500, msg: error.toString() })
    } 
});

// Divide endpoint divides the first number by the second
// Example command to make the app work
// http://localhost:3040/divide?n1=1&n2=3
app.get("/divide", (req,res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        logger.info('Parameters '+n1+' and '+n2+' received for division');
        verifyNumbers(n1, n2)

        if(n2 == 0){
            logger.error("n2 cannot be 0");
            throw new Error("n2 cannot be 0");
        }

        const result = divide(n1,n2);
        res.status(200).json({statuscode:200, data: result});

    } catch (error) {
        console.error(error)
        res.status(500).json({statuscode: 500, msg: error.toString() })
    } 
});


// Start the server

app.listen(port, () => {
    console.log("hello i'm listening to port " + port);
})


