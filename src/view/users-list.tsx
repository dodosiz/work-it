import * as React from "react";
import { useSelector } from "react-redux";
import { User, usersSelector } from "../data/users";

export function UsersList() {
	const users = useSelector(usersSelector);
	return <ul>
		{users.map((user, index) => (
			<User key={`$${user.name}-${index}`} user={user}/>
		))}
	</ul>;
}

interface UserProps {
	user: User;
}

function User(props: UserProps) {
	return <li>{props.user.name}, role: {props.user.role}</li>;
}
