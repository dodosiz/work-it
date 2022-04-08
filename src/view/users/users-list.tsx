import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, User, usersSelector } from "../../data/users";
import { BsFillTrashFill } from "react-icons/bs";

export function UsersList() {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector);
	const handleDelete = (id: string) => {
		dispatch(deleteUser({ id }));
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
	handleDelete(id: string): void;
}

function User(props: UserProps) {
	return (
		<tr>
			<td>{props.index}</td>
			<td>{props.user.firstName}</td>
			<td>{props.user.lastName}</td>
			<td>{props.user.role}</td>
			<td>
				<Button
					variant="danger"
					onClick={() => props.handleDelete(props.user.id)}
				>
					<BsFillTrashFill />
				</Button>
			</td>
		</tr>
	);
}
