import React, { useState } from 'react'

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn } from 'mdbreact'
import { register } from '../api'
import { useHistory } from 'react-router-dom'

const Register = () => {
	const [email, setEmail] = useState("")
	const [firstName, setFirst] = useState("")
	const [lastName, setLast] = useState("")
	const [password, setPassword] = useState("")
	const [telephoneNumber, setPhone] = useState("")
	const history = useHistory()

	const onSubmit = (ev) => {
		ev.preventDefault()
		register({email, password, firstName, lastName, telephoneNumber}).then(() => {
			console.log("ok")
			history.push("/login")
		})
	}
	return (
		<MDBRow center className="mt-5 pt-5">
			<MDBCol size="8">
				<MDBCard>
					<MDBCardBody>
						<MDBCardHeader className="form-header deep-blue-gradient">Sign In</MDBCardHeader>
						<form onSubmit={onSubmit}>
							<div className="grey-text">
								<MDBInput label="First Name" icon="user" group type="text" validate  getValue={(r) => {setFirst(r)}} />
								<MDBInput label="Last Name" icon="user" group type="text" validate  getValue={(e) => setLast(e)} />
								<MDBInput label="tel" icon="phone-alt" group type="telephone" validate  getValue={(e) => setPhone(e)} />
								<MDBInput label="Email" icon="envelope" group type="email" validate  getValue={(e) => setEmail(e)} />
								<MDBInput label="Password" icon="lock" group type="password" validate  getValue={(e) => setPassword} />
							</div>
							<div className="text-center py-4 mt-3">
								<MDBBtn color="default" type="submit">Register</MDBBtn>
							</div>
						</form>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</MDBRow>
	)
}

export default Register