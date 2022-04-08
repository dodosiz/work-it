import * as React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openUserForm } from "../data/users";
import { UsersPage } from "./users/users-page";

export function App() {
	const dispatch = useDispatch();
	const handleCreateUserClick = () => {
		dispatch(openUserForm());
	};
	return (
		<div>
			<Navbar expand="lg" variant="light" bg="light">
				<Container>
					<Navbar.Brand>Work IT</Navbar.Brand>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Button variant="success" onClick={handleCreateUserClick}>
								Create User
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className="container main">
				<UsersPage />
			</div>
		</div>
	);
}
