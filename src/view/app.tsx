import * as React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	closeUserForm,
	openUserForm,
	userFormOpenedSelector,
} from "../data/users";
import { ModalDialog } from "./modal-dialog";
import { CreateUserForm } from "./users/create-user-form";
import { UsersPage } from "./users/users-page";

export function App() {
	const dispatch = useDispatch();
	const userFormOpened = useSelector(userFormOpenedSelector);
	const handleCreateUserClick = () => {
		dispatch(openUserForm());
	};
	const handleCloseUserForm = () => {
		dispatch(closeUserForm());
	};
	return (
		<>
			<ModalDialog
				handleClose={handleCloseUserForm}
				show={userFormOpened}
				title="Create new user"
			>
				<CreateUserForm />
			</ModalDialog>
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
		</>
	);
}
