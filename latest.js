
'use strict';

const path = require('path');
const fs = require('fs');

const log_file = __dirname + '/logs/latest.log';
const buffer = fs.readFileSync(log_file, 'utf-8');

const parts = buffer.split(',');
if (parts.length !== 3) {
    console.error("Unable to read ", log_file);
    process.exit(1);
}

const [ when, temp, co2 ] = parts.map(s => s.trim())
const output = {
    time: when,
    temperature: { value: temp, unit: "°C" },
    co2: { value: co2, unit: "ppm" }
};

console.log(JSON.stringify(output));

