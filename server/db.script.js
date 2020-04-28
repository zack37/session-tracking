const shortid = require('shortid');
const client = require('./build/lib/sql-client');

async function createTables() {
  const createTrainersQuery = `
    CREATE TABLE IF NOT EXISTS trainers (
      id varchar(14) PRIMARY KEY,
      name text NOT NULL,
      email text UNIQUE NOT NULL,
      "createdAt" timestamp with time zone default (now() at time zone 'utc'),
      "updatedAt" timestamp with time zone default (now() at time zone 'utc')
    )
  `;
  const createClientsQuery = `
    CREATE TABLE IF NOT EXISTS clients (
      id varchar(14) PRIMARY KEY,
      name text NOT NULL,
      email text UNIQUE NOT NULL,
      "trainerId" varchar(14) REFERENCES trainers,
      "createdAt" timestamp with time zone default (now() at time zone 'utc'),
      "updatedAt" timestamp with time zone default (now() at time zone 'utc')
    )
  `;
  const createPaymentsQuery = `
    CREATE TABLE IF NOT EXISTS payments (
      id varchar(14) PRIMARY KEY,
      date timestamp with time zone,
      amount numeric,
      "clientId" varchar(14) REFERENCES clients,
      "createdAt" timestamp with time zone default (now() at time zone 'utc'),
      "updatedAt" timestamp with time zone default (now() at time zone 'utc')
    )
  `;
  const createSessionsQuery = `
    CREATE TABLE IF NOT EXISTS sessions (
      id varchar(14) PRIMARY KEY,
      date timestamp with time zone,
      amount numeric,
      "clientId" varchar(14) REFERENCES clients,
      "createdAt" timestamp with time zone default (now() at time zone 'utc'),
      "updatedAt" timestamp with time zone default (now() at time zone 'utc')
    )
  `;

  try {
    console.log('Creating trainers table');
    await client.query(createTrainersQuery);
    console.log('Creating clients table');
    await client.query(createClientsQuery);
    console.log('Creating payments table');
    await client.query(createPaymentsQuery);
    console.log('Creating sessions table');
    await client.query(createSessionsQuery);
  } catch (error) {
    console.error(error);
  }
}

async function insertData() {
  try {
    const trainerId = shortid.generate();
    const clientId = shortid.generate();
    const insertTrainer = `
      INSERT INTO
        trainers (id, name, email)
      VALUES
        ('${trainerId}', 'Jaxon Knighton', 'knight.to.fit@gmail.com')
    `;
    const insertClient = `
      INSERT INTO
        clients (id, name, email, "trainerId")
      VALUES
        ('${clientId}', 'Zack Smith', 'zack.t.smith37@gmail.com', '${trainerId}')
    `;
    const insertPayment = `
      INSERT INTO
        payments (id, date, amount, "clientId")
      VALUES
        ('${shortid.generate()}', '${new Date().toISOString()}', 240, '${clientId}')
    `;
    const insertSession = `
      INSERT INTO
        sessions (id, date, amount, "clientId")
      VALUES
        ('${shortid.generate()}', '${new Date().toISOString()}', 30, '${clientId}')
    `;

    console.log('inserting trainer');
    await client.query(insertTrainer);
    console.log('inserting client');
    await client.query(insertClient);
    console.log('inserting payment');
    await client.query(insertPayment);
    console.log('inserting session');
    await client.query(insertSession);
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  await createTables();

  await insertData();
}

run();
