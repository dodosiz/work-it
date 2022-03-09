import * as React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../data/users";

export function CreateUserForm() {
	const dispatch = useDispatch();
	const [name, setName] = React.useState("");
	const [role, setRole] = React.useState("");
	const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setName(event.target.value);
	};
	const handleRoleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setRole(event.target.value);
	};
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();
		dispatch(addUser({name, role}));
		setName("");
		setRole("");
	};
	return <form onSubmit={handleSubmit}>
		<label htmlFor="name">Name:</label>
		<input id="name" type="text" value={name} onChange={handleNameChange} />
		<label htmlFor="role">Role:</label>
		<input id="role" aria-label="role" type="text" value={role} onChange={handleRoleChange} />
		<button type="submit">Submit</button>
	</form>;
}
