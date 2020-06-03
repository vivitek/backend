const amqp = require("amqplib");


let connection = null;


const createConnection = async() => {
	if (!connection) connection = await amqp.connect(`amqp://${process.env.RABBIT}`);
	return connection;
};

/**
 * 
 */
const createChannel = async() => {
	let connection = await createConnection();
	let channel = await connection.createChannel(); 
	return channel;
};



/**
 * 
 * @param {String} name
 * @param {Object} channel
 */
const createQueue = async(name) => {
	const channel = await createChannel(name);
	const result = await channel.assertQueue(name, {durable:true});
	await channel.close();
	return result;
};

/**
 * 
 * @param {String} name 
 * @param {String} message
 * @param {Object} channel
 * @returns {Boolean}
 */
const sendMessage = async(name, message) => {
	await createQueue(name);
	let channel = await createChannel(name);
	return channel.sendToQueue(name, Buffer.from(message), {persistent:true});
};

/**
 * 
 * @param {String} name 
 */
const readConnections = async(name, callback) => {
	await createConnection();
	r.db("vivi").table("connections").filter(r.row("treated").eq(false)).filter(r.row("routerId").eq(name)).changes().run(connection, callback);
};

const treatConnection = async(id) => {
	await createConnection();
	await r.db("vivi").table("connections").get(id).update({treated:true, updatedAt: new Date().getTime()}).run(connection);
};

const getConnections = async(name, callback) => {
	await createConnection();

	r.db("vivi").table("connections").filter(r.row("treated").eq(false)).filter(r.row("routerId").eq(name)).run(connection, callback);
}
const readQueue = async(name) => {
	await createQueue(name);
	let channel = await createChannel(name);
	return channel;
};

module.exports = {createConnection, createChannel, createQueue, sendMessage, readQueue};