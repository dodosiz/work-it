import * as React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { User, usersSelector } from "../../data/users";

export function UsersList() {
	const users = useSelector(usersSelector);
	return <Table striped bordered hover>
		<thead>
			<tr>
				<th>#</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Role</th>
			</tr>
		</thead>
		<tbody>
			{users.map((user, index) => (
				<User key={user.id} user={user} index={index} />
			))}
		</tbody>
	</Table>;
}

interface UserProps {
	index: number;
	user: User;
}

function User(props: UserProps) {
	return <tr>
		<td>{props.index}</td>
		<td>{props.user.firstName}</td>
		<td>{props.user.lastName}</td>
		<td>{props.user.role}</td>
	</tr>;
}
