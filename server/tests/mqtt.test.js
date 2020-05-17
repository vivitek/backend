const broker = require("../messages/index");

describe("message publication utilities", () => {
	it("publish and read message to queue", async() => {
		await broker.sendMessage("testRoute", "hello world");
		const channel = await broker.readQueue("testRoute");
		channel.consume("testRoute", (msg) => {
			expect(msg.content.toString()).toBe("hello world");
			channel.ack(msg);
		});
	});
});