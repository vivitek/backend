import React, { useState } from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn } from 'mdbreact'
import { login } from '../api'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = (ev) => {
		ev.preventDefault()
		login({email, password}).then(res => {
			console.log(res.data)
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
								<MDBInput label="Email" icon="envelope" group type="email" validate error="wrong" success="right" getValue={(e) => setEmail(e)} />
								<MDBInput label="Password" icon="lock" group type="password" validate error="wrong" success="right" getValue={(e) => setPassword(e)} />
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

export default Login