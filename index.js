const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

app.use(morgan("dev"))
app.use(cors())


app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})