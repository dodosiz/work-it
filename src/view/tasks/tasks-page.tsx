import * as React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	closeTaskForm,
	openTaskForm,
	taskFormOpenedSelector,
} from "../../data/tasks/tasks";
import { TaskFilter } from "../filter/task-filter";
import { ModalDialog } from "../modal/modal-dialog";
import { TaskForm } from "./task-form";
import { TasksList } from "./tasks-list";

export function TasksPage(props: { mode: "todo" | "done" }) {
	const dispatch = useDispatch();
	const taskFormOpened = useSelector(taskFormOpenedSelector);
	const handleCloseTaskForm = () => {
		dispatch(closeTaskForm());
	};
	const handleCreateTaskClick = () => {
		dispatch(openTaskForm());
	};
	return (
		<>
			<ModalDialog
				handleClose={handleCloseTaskForm}
				show={taskFormOpened}
				title="Create new task"
			>
				<TaskForm />
			</ModalDialog>
			<Navbar expand="lg" variant="light" bg="light">
				<Container>
					<Nav className="me-auto">
						{props.mode === "todo" && (
							<Button variant="success" onClick={handleCreateTaskClick}>
								Create Task
							</Button>
						)}
					</Nav>
					<TaskFilter />
				</Container>
			</Navbar>
			<Container>
				<TasksList mode={props.mode} />
			</Container>
		</>
	);
}
