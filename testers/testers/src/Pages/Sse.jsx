import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { ack } from '../api'
import Swal from 'sweetalert2'

const Sse = () => {
	const [source, setSource] = useState("")
	const [data, setData] = useState([])

	const updateData = (value) => {
		const oldData = [...data]
		console.log(JSON.parse(value))
		const parsedValue = value
		const index = data.findIndex((e) => e.value === parsedValue)
		if (index === - 1) {
			oldData.push({parsedValue, count: 1})
		} else if (index >= 0) {
			oldData[index].count += 1
		}
		setData(oldData)

	}
	const startListening = () => {
		const ev = new EventSource(`http://localhost:5000/connections/${source}?datetime=${new Date().getTime()}&token=${localStorage.getItem("jwt")}`)
		ev.onmessage = (e) => {
			updateData(e.data)
		}
	}
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol size="8">
					<MDBInput label="EventSource address" getValue={(v) => setSource(v)} />
				</MDBCol>
				<MDBCol size="4">
					<MDBBtn color="default" onClick={() => startListening()}>Go</MDBBtn>
				</MDBCol>
			</MDBRow>
			<h3 className="text-center">Data</h3>
			<MDBRow>
				<MDBCol size="12">
					<MDBTable>
						<MDBTableHead color="primary-color" textWhite>
							<tr>
								<th>Value</th>
								<th>Count</th>
								<th align="right">Action</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{data.map((d) => 
							<tr>
								<td>{d.value}</td>
								<td>{d.count}</td>
								<td>
									<MDBBtn color="green" onClick={() => ack(source, d.value.id, false).then(Swal.fire("Success", "Message Acked", "success"))}>Accept</MDBBtn>
									<MDBBtn color="danger" onClick={() => ack(source, d.value.id, true).then(Swal.fire("Success", "Message Acked", "success"))}>Deny</MDBBtn>
								</td>
							</tr>)}
						</MDBTableBody>
					</MDBTable>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default Sse