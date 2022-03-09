import * as React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../data/users";

export function CreateUserForm() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [role, setRole] = React.useState("");
	const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setFirstName(event.target.value);
	};
	const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setLastName(event.target.value);
	};
	const handleRoleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setRole(event.target.value);
	};
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();
		dispatch(addUser({firstName, lastName, role}));
		setFirstName("");
		setLastName("");
		setRole("");
	};
	return <form onSubmit={handleSubmit}>
		<label htmlFor="firstName">First name:</label>
		<input id="firstName" type="text" value={firstName} onChange={handleFirstNameChange} />
		<label htmlFor="lastName">Last name:</label>
		<input id="lastName" type="text" value={lastName} onChange={handleLastNameChange} />
		<label htmlFor="role">Role:</label>
		<input id="role" aria-label="role" type="text" value={role} onChange={handleRoleChange} />
		<button type="submit">Submit</button>
	</form>;
}
