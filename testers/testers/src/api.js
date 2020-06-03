import axios from 'axios'

const client = axios.create({
	baseURL:"https://api.server.vincipit.com"
})

const register = (data) => {
	return client.post("/auth/register", data)
}

const login = (data) => {
	return client.post("/auth/login", data)
}

const ack = (id, message, auth) => {
	return client.post(`/connections/ack/${id}`, {message, auth}, {
		headers: {authorization: `Bearer ${localStorage.getItem("jwt")}`}
	})
}

export {register, login, ack}