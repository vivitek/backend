const broker = require("../messages/index");

describe("Message Broker", () => {
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
});