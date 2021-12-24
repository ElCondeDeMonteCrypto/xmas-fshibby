const express = require('express');
const url = require('url');
const port = 3000;

const logger = require('loglevel');
const bodyParser = require('body-parser');
const queryString = require('query-string');

const fshibbyController = require('./contracts/fshibby.controller');

let app = express();
app.use(express.static(__dirname)); // renders index.html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//This endpoint determines if an user is eligible to participate in the sweepstake event
//by returning a boolean
app.get('/getBalance', async function(req, res){
    let tokenHolderAddress = req.query.addressToCheck;
    logger.info('getBalance endpoint called by: ' + req.ip);
    try {
        let isEligible = await fshibbyController.getBalance(tokenHolderAddress);
        res.send(isEligible);
        logger.info('getBalance process has been completed successfully');
    } catch (e) {
        logger.warn('Issue processing getBalance endpoint ' + e.message);
        console.log(e.message);
    }
  });

app.listen(port, () => {
    console.log('App listening on http://localhost:' + port);
});
