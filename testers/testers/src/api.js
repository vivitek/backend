import axios from "axios";

const client = axios.create({
	baseURL:"http://localhost:5000"
});

const register = (data) => {
	return client.post("/auth/register", data);
};

const login = (data) => {
	return client.post("/auth/login", data);
};

const ack = (id, connectionId, address, auth) => {
	console.log(`received ${id} ${connectionId} ${address} ${auth}`)
	return client.post(`/connections/ack/${id}`, {auth, connectionId, address}, {
		headers: {authorization: `Bearer ${localStorage.getItem("jwt")}`}
	});
};

export {register, login, ack};