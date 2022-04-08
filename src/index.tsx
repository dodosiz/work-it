import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./data/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./view/app";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);
