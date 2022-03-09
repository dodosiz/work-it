import * as React from "react";
import { CreateUserForm } from "./create-user-form";
import { UsersList } from "./users-list";

export function App() {
	return <div className="container main">
		<CreateUserForm />
		<UsersList />
	</div>;
}
