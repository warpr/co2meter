wurk/co2
========

This is mostly a wrapper around node-co2-monitor to read values from a CO2Meter.com
device and publish them to MQTT.

It doesn't actually speak MQTT, but outputs a line of JSON which can easily be piped
into mosquitto_pub.


Usage
-----

    sudo node ./co2.js | mosquitto_pub -t wurk/co2 -l


Open-source, not open-contribution
----------------------------------

wurk is open source but closed to contributions.

This project is not my day job, and the enjoyment I get out of this project is mainly
down to these two properties:

1. There are no deadlines, I can work on a feature as long as I want.
2. I can make completely unreasonable and stubborn technology choices.

Collaborating on features or accepting and maintaining third party patches would
compromise this.

License
=======

Copyright 2020,2021 Kuno Woudt <kuno@frob.nl>

This program is free software: you can redistribute it and/or modify
it under the terms of copyleft-next 0.3.1. See
[copyleft-next-0.3.1.txt](copyleft-next-0.3.1.txt).

SPDX-License-Identifier: copyleft-next-0.3.1

