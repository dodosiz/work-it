import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser, closeUserForm } from "../../data/users";

export function CreateUserForm() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [role, setRole] = React.useState("");
	const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setFirstName(event.target.value);
	};
	const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setLastName(event.target.value);
	};
	const handleRoleChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setRole(event.target.value);
	};
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		dispatch(addUser({ firstName, lastName, role }));
		dispatch(closeUserForm());
	};
	const submitDisabled = () => {
		return !(firstName.length && lastName.length && role.length);
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="firstName">
				<Form.Label>First name:</Form.Label>
				<Form.Control
					type="text"
					value={firstName}
					onChange={handleFirstNameChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="lastName">
				<Form.Label>Last name:</Form.Label>
				<Form.Control
					type="text"
					value={lastName}
					onChange={handleLastNameChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="role">
				<Form.Label>Role:</Form.Label>
				<Form.Control type="text" value={role} onChange={handleRoleChange} />
			</Form.Group>
			<Button disabled={submitDisabled()} variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
