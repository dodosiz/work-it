import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeUserForm, userFormOpenedSelector } from "../../data/users/users";
import { ModalDialog } from "../modal/modal-dialog";
import { UserForm } from "./user-form";
import { UsersList } from "./users-list";

export function UsersPage() {
	const dispatch = useDispatch();
	const userFormOpened = useSelector(userFormOpenedSelector);
	const handleCloseUserForm = () => {
		dispatch(closeUserForm());
	};
	return (
		<div>
			<ModalDialog
				handleClose={handleCloseUserForm}
				show={userFormOpened}
				title="Create new user"
			>
				<UserForm />
			</ModalDialog>
			<UsersList />
		</div>
	);
}
