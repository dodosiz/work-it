import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../data/notifications/notifications";
import {
	addUser,
	closeUserForm,
	editedUserSelector,
	updateUser,
} from "../../data/users/users";

export function UserForm() {
	const dispatch = useDispatch();
	const editedUser = useSelector(editedUserSelector);
	const [firstName, setFirstName] = React.useState(
		editedUser ? editedUser.firstName : ""
	);
	const [lastName, setLastName] = React.useState(
		editedUser ? editedUser.lastName : ""
	);
	const [role, setRole] = React.useState(editedUser ? editedUser.role : "");
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
		if (editedUser) {
			dispatch(updateUser({ id: editedUser.id, firstName, lastName, role }));
			dispatch(
				addNotification({
					message: `Updated user ${firstName} ${lastName}.`,
				})
			);
		} else {
			dispatch(addUser({ firstName, lastName, role }));
			dispatch(
				addNotification({
					message: `Added user ${firstName} ${lastName}.`,
				})
			);
		}
		dispatch(closeUserForm());
	};
	const handleCancel = () => {
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
				Save
			</Button>{" "}
			<Button variant="secondary" onClick={() => handleCancel()}>
				Cancel
			</Button>
		</Form>
	);
}
