import * as React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	closeUserForm,
	editedUserSelector,
	openUserForm,
	userFormOpenedSelector,
} from "../../data/users/users";
import { ModalDialog } from "../modal/modal-dialog";
import { UserForm } from "./user-form";
import { UsersList } from "./users-list";

export function UsersPage() {
	const dispatch = useDispatch();
	const userFormOpened = useSelector(userFormOpenedSelector);
	const editedUser = useSelector(editedUserSelector);
	const handleCloseUserForm = () => {
		dispatch(closeUserForm());
	};
	const handleCreateUserClick = () => {
		dispatch(openUserForm());
	};
	return (
		<>
			<ModalDialog
				handleClose={handleCloseUserForm}
				show={userFormOpened}
				title={editedUser ? "Edit user" : "Create new user"}
			>
				<UserForm />
			</ModalDialog>
			<Navbar expand="lg" variant="light" bg="light">
				<Container>
					<Nav className="me-auto">
						<Button variant="success" onClick={handleCreateUserClick}>
							Create User
						</Button>
					</Nav>
				</Container>
			</Navbar>
			<Container>
				<UsersList />
			</Container>
		</>
	);
}
