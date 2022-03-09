import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./data/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateUserForm } from "./view/create-user-form";
import { UsersList } from "./view/users-list";

ReactDOM.render(
	<Provider store={store}>
		<CreateUserForm />
		<UsersList />
	</Provider>,
	document.getElementById("app"),
);
