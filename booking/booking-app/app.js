const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const utils = require('./utils')
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.BOOKING_PORT || 8087;
const AUTH_TOKEN = process.env.AUTH_SECRET_TOKEN || 'b05248bdc8082daf41d3c3c03595a3d528a4348e7b29938bbb24b6d0f241d3008e55f85a0ac92e75164d040cd948210aaa528a3fa81de1a7e3b2d7a3887ec3bd';


app.use(cors());
app.use(express.json());


app.post('/booking', async (req, res) => {

    const user_token = req.header('authorization')
    if (!user_token) return res.status(400).send(utils.errors.invalidToken);

    let user;

    try {
        user = jwt.verify(user_token, AUTH_TOKEN);
    } catch (error) {
        return res.status(400).send(utils.errors.invalidToken);
    }

    const flight_id = parseInt(req.body?.flight_id);

    if (!flight_id || typeof flight_id !== 'number') return res.status(400).send(utils.errors.missingFlight);

    const stored_booking = await prisma.booking.create({
        data: {
            userId: user.id,
            flightId: flight_id
        }
    })

    if (stored_booking) return res.status(200).send();
    else return res.status(500).send();

})

app.get('/booking', async (req, res) => {

    const user_token = req.header('authorization')
    if (!user_token) return res.status(400).send(utils.errors.invalidToken);

    let user;

    try {
        user = jwt.verify(user_token, AUTH_TOKEN);
    } catch (error) {
        return res.status(400).send(utils.errors.invalidToken);
    }

    const stored_bookings = await prisma.booking.findMany({
        where: {
            userID: user.id
        }
    })

    res.status(200).send(stored_bookings);

})

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    else console.log(`Booking Microservice running on port ${PORT}`)
})