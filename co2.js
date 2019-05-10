
'use strict';

const path = require('path');
const CO2Monitor = require('node-co2-monitor');

function saveValues(temp, co2) {
    const d = new Date();

    const today = new Date().toISOString().split('T')[0];
    const todayLog = __dirname + '/logs/' + today + '.log';
    const latestLog = __dirname + '/logs/latest.log';

    const fs = require('fs');

    const output = [ d.toISOString(), temp, co2 ].join(", ") + "\n";

    fs.appendFileSync(todayLog, output);
    fs.writeFileSync(latestLog, output);
}

function measure() {
    return new Promise((resolve, reject) => {
        const monitor = new CO2Monitor();

        // Error handler
        monitor.on('error', (err) => {
            console.error(err.stack);
            reject(err);

            // Disconnect device
            monitor.disconnect(() => {
                console.log('Monitor disconnected.');
                process.exit(0);
            });
        });

        monitor.connect((err) => {
            if (err) {
                console.error(err.stack);
                reject(err);
            }

            // Read data from CO2 monitor.
            monitor.transfer();

            console.log('Reading from CO2 monitor...');

            resolve(Promise.all([
                new Promise(t => monitor.on('temp', t)),
                new Promise(c => monitor.on('co2', c)),
            ]).then(values => {
                return {
                    temperature: values[0],
                    co2: values[1],
                };
            }));
        });
    });
}

measure().then(results => {
    saveValues(results.temperature, results.co2);

    console.log('temp is ', results.temperature);
    console.log('co2  is ', results.co2);

    console.log("exiting...");
    process.exit(0);
}).catch(err => {
    console.log("ERROR:", err);
});



