import React, { useState } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact'
import { useHistory, useLocation } from 'react-router-dom'


export default () => {
	const [isOpen, toggle] = useState(false)
	const history = useHistory()
	const location = useLocation()
	return (
		<header>
			<MDBNavbar dark expand="md" color="blue">
				<MDBNavbarBrand>
					<strong className="white-text" style={{cursor:"pointer"}} onClick={() => history.push("/")}>ViTest</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={() => toggle(!isOpen)} />
				<MDBCollapse isOpen={isOpen} navbar>
					<MDBNavbarNav right>
						<MDBNavItem active={location.pathname === "/sse"}>
							<MDBNavLink to="/sse">SSE</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		</header>
	)
}
