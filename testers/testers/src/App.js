import React from "react";
import {MDBContainer} from "mdbreact";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/Nav";
import Routes from "./Routes";
function App() {
	return (
		<BrowserRouter>
			<Nav />
			<MDBContainer fluid>
				<Routes />
			</MDBContainer>
		</BrowserRouter>
	);
}

export default App;
