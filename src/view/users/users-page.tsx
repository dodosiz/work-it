import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	closeUserForm,
	editedUserSelector,
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
	return (
		<div>
			<ModalDialog
				handleClose={handleCloseUserForm}
				show={userFormOpened}
				title={editedUser ? "Edit user" : "Create new user"}
			>
				<UserForm />
			</ModalDialog>
			<UsersList />
		</div>
	);
}
