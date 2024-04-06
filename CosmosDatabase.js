const {CosmosClient} = require("@azure/cosmos");
require('dotenv').config();

const endpoint = process.env.ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

async function createDatabaseAndContainer() {
    await client.databases.createIfNotExists({ id: databaseId });
    await database.containers.createIfNotExists({ id: containerId });
}

async function addItem(item) {
    await container.items.create(item);
}

async function queryItems(querySpec) {
    const { resources: items } = await container.items.query(querySpec).fetchAll();
    return items;
}

// You could call createDatabaseAndContainer here if you want to ensure
// the database and container are created as soon as this module is imported.
// However, be mindful of where and how you're using asynchronous initialization
// in your application to avoid unexpected behavior.

module.exports = {
    createDatabaseAndContainer,
    addItem,
    queryItems,
};