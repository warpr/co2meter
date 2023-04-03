/**
 *   Copyright (C) 2023  Kuno Woudt <kuno@frob.nl>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of copyleft-next 0.3.1.  See copyleft-next-0.3.1.txt.
 *
 *   SPDX-License-Identifier: copyleft-next-0.3.1
 */

'use strict';

const path = require('path');
const CO2Monitor = require('node-co2-monitor');

function measure() {
    return new Promise((resolve, reject) => {
        const monitor = new CO2Monitor();

        // Error handler
        monitor.on('error', (err) => {
            console.error(err.stack);
            reject(err);

            // Disconnect device
            monitor.disconnect(() => {
                console.error('Monitor disconnected.');
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

            console.error('Reading from CO2 monitor...');

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
    const now = new Date();

    const output = {
        time: now.toISOString(),
        co2: { value: results.co2, unit: "ppm", html: "CO<sub>2</sub>" },
        temperature: { value: results.temperature, unit: "°C", html: "Temp" }
    };

    console.log(JSON.stringify(output));

    process.exit(0);
}).catch(err => {
    console.error("ERROR:", err);
});



