const broker = require("../messages/index");
const r = require("rethinkdb");

describe("Message Broker", () => {
	beforeAll(async() => {
		const initializeRethink = async(connection) => {
			try {
				await r.dbCreate("vivi").run(connection);
				await r.db("vivi").tableCreate("connections").run(connection);
				console.log("[+] Connection to rethinkdb established");
			} catch (error) {
				console.log("[-] Tried creating tables for rethinkdb; they probably exist already");
			}
		};
		const connection = await r.connect({host:"rethink", port:28015, db:"vivi"});
		await initializeRethink(connection);
	});
	it("Send a Message to queue", async() => {
		await broker.sendMessage("test1", "this is a test");
		broker.getConnections("test1", async(err, cursor) => {
			const array = await cursor.toArray();
			const index = array.find((e) => e.data === "this is a test");
			expect(index).not.toBeUndefined();
		});
	});
	it("Marks message as treated", async() => {
		await broker.sendMessage("test2", "this is a test");
		broker.getConnections("test2", async(err, cursor) => {
			const array = await cursor.toArray();
			await broker.treatConnection(array[0].id);
			broker.getConnections("test2", async(err, cur) => {
				const data = await cur.toArray();
				expect(data[0].treated).toBe(true);
			});
		});
	});
	it("Reads incoming message", async() => {
		broker.readConnections("test3", async(err, cursor) => {
			cursor.each((err, e) => {
				expect(e.new_val.data).toBe("ok");
			});
		});
		await broker.sendMessage("test3", "ok");
	});
});