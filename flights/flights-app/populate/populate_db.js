const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const airports = [
    { name: "LHR", full_name: "London Heathrow Airport" },
    { name: "CDG", full_name: "Charles de Gaulle Airport" },
    { name: "FRA", full_name: "Frankfurt Airport" },
    { name: "AMS", full_name: "Amsterdam Airport Schiphol" },
    { name: "BCN", full_name: "Barcelona-El Prat Airport" },
    { name: "MAD", full_name: "Adolfo Suárez Madrid–Barajas Airport" },
    { name: "FCO", full_name: "Leonardo da Vinci-Fiumicino Airport" },
    { name: "IST", full_name: "Istanbul Atatürk Airport" },
    { name: "MUC", full_name: "Munich Airport" },
    { name: "CPH", full_name: "Copenhagen Airport" },
    { name: "ZRH", full_name: "Zurich Airport" },
    { name: "ATH", full_name: "Athens International Airport" },
    { name: "VIE", full_name: "Vienna International Airport" },
    { name: "ARN", full_name: "Stockholm Arlanda Airport" },
    { name: "PRG", full_name: "Václav Havel Airport Prague" },
    { name: "DUB", full_name: "Dublin Airport" },
    { name: "HEL", full_name: "Helsinki-Vantaa Airport" },
    { name: "OSL", full_name: "Oslo Airport, Gardermoen" },
    { name: "WAW", full_name: "Warsaw Chopin Airport" },
];



const flights = [
    {airportStartId:1, airportDestinationId:2},
    {airportStartId:4, airportDestinationId:2},
    {airportStartId:1, airportDestinationId:2},
    {airportStartId:12, airportDestinationId:2},
    {airportStartId:1, airportDestinationId:11},
    {airportStartId:10, airportDestinationId:2},
    {airportStartId:6, airportDestinationId:9},
    {airportStartId:15, airportDestinationId:12}
]


async function insertAirport(airport) {
    const inserted = await prisma.airport.create({
        data: airport
    })
}

async function insertFlight(flight) {
    const inserted = await prisma.flight.create({
        data: flight
    })
}


airports.forEach(async (airport) => {
    await insertAirport(airport)
})

flights.forEach(async (flight) => {
    await insertFlight(flight)
})




//TODO: insert all airports from the csv into the db

//TODO: make a function that generates random flights with the args (quantity, timespace)


