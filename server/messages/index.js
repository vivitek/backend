const r = require("rethinkdb");

let connection;

const createConnection = async() => {
	if (!connection) connection = await r.connect({host:"rethink", port:28015, db:"vivi"});
	return connection;
};

/**
 * 
 * @param {String} name 
 * @param {String} message
 * @param {Object} channel
 * @returns {Boolean}
 */
const sendMessage = async(name, message) => {
	await createConnection();
	await r.table("connections").insert([{
		routerId: name,
		data: message,
		createdAt: new Date().getTime(),
		updatedAt: new Date().getTime(),
		treated: false
	}]).run(connection);
};

/**
 * 
 * @param {String} name
 * @param {Function} callback
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
};

module.exports = {createConnection, sendMessage, readConnections, treatConnection, getConnections};