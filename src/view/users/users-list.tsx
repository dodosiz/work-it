import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteUser,
	editUser,
	openUserForm,
	User,
	usersSelector,
} from "../../data/users/users";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { addNotification } from "../../data/notifications/notifications";

export function UsersList() {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector);
	const handleDelete = (user: User) => {
		dispatch(deleteUser({ id: user.id }));
		dispatch(
			addNotification({
				message: `Deleted user ${user.firstName} ${user.lastName}.`,
			})
		);
	};
	const handleEdit = (id: string) => {
		dispatch(editUser({ id }));
		dispatch(openUserForm());
	};
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Role</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<User
						key={user.id}
						user={user}
						index={index}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))}
			</tbody>
		</Table>
	);
}

interface UserProps {
	index: number;
	user: User;
	handleEdit(id: string): void;
	handleDelete(user: User): void;
}

function User(props: UserProps) {
	return (
		<tr>
			<td>{props.index + 1}</td>
			<td>{props.user.firstName}</td>
			<td>{props.user.lastName}</td>
			<td>{props.user.role}</td>
			<td>
				<Button
					data-testid={`edit-button-${props.index}`}
					variant="outline-primary"
					onClick={() => props.handleEdit(props.user.id)}
				>
					<BsPencilFill />
				</Button>{" "}
				<Button
					data-testid={`delete-button-${props.index}`}
					variant="outline-danger"
					onClick={() => props.handleDelete(props.user)}
				>
					<BsFillTrashFill />
				</Button>
			</td>
		</tr>
	);
}
