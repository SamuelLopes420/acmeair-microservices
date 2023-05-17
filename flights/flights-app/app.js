const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const utils = require('./utils');

dotenv.config();
const prisma = new PrismaClient();
const app = express();


const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.get('/flight', async (req, res) => {

    let query = {
        start: req.query?.start,
        destination: req.query?.destination,
        date: req.query?.date,
        page: req.query?.page
    }

    query.page = (!query.page) ? "1" : query.page;
    query.date = (!query.date) ? new Date().toLocaleDateString() : query.date;

    try {
        query.page = parseInt(query.page)
    } catch (error) {
        query.page = 1
    }

    if (!query.start || !query.destination) return res.status(400).send(utils.errors.missing);

    const start_airport = await prisma.airport.findUnique({
        where: {
            name: query.start
        }
    })

    const destination_airport = await prisma.airport.findUnique({
        where: {
            name: query.destination
        }
    })

    if(!start_airport || !destination_airport) return res.status(400).send(utils.errors.airportNotExist);

    const flights = await prisma.flight.findMany({
        where: {
            airportStartId: start_airport.id,
            airportDestinationId: destination_airport.id
        },
        skip: query.page * 10
    })

    res.status(200).send(flights)
})



app.listen(PORT, (error) => {
    if (error) return console.log(error);
    else return console.log(`Flights Microservice listening on port ${PORT}`)
})


