import React from "react";
import "./App.css";
import {Layout} from 'antd'
import {BrowserRouter} from 'react-router-dom'
function App() {
	return (
		<Layout>
		<BrowserRouter>

		</BrowserRouter>
		<Layout.Footer>
			Footer
		</Layout.Footer>
		</Layout>
	);
}

export default App;
