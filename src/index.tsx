import React from "react";
import ReactDOM from "react-dom";
import { App } from "./view/app";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./data/store";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app"),
);
