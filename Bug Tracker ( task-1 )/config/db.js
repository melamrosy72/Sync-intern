const { Client } = require('pg')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PG_PW,
    database: "postgres"
})


async function connectDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}


module.exports =  {client, connectDatabase}