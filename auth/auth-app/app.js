const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const errors = require('./errors')

const { PrismaClient } = require('@prisma/client');
dotenv.config();
const prisma = new PrismaClient()
const app = express();

const PORT = process.env.AUTH_PORT;
const SALT = process.env.AUTH_SALT;
const SECRET_TOKEN = process.env.AUTH_SECRET_TOKEN

const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) return res.status(400).send(errors.missing);

    password = bcrypt.hashSync(password, SALT);

    const match = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!match) return res.status(400).send(errors.inexistence);

    if (password === match?.password) {

        const token = jwt.sign(match, SECRET_TOKEN) //add expiration date if needed

        return res.status(200).send({
            token: token
        });

    }
    else {
        return res.status(400).send(errors.wrong);
    }

})

app.post('/register', async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) return res.status(400).send(errors.missing);

    if (!validEmailRegex.test(email)) return res.status(400).send(errors.emailFormat);

    const match = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (match) return res.status(400).send(errors.alreadyExist);

    password = bcrypt.hashSync(password, SALT);

    const createdUser = await prisma.user.create({
        data: {
            email: email,
            password: password
        }
    })

    if (createdUser?.email == email) return res.status(200).send();
    else return res.status(500).send()

})


app.listen(PORT, (err) => {
    if (err) return err;
    else console.log(`Auth Microservice listening on port ${PORT}`)
})