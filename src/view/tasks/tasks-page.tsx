import * as React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	clickedTaskSelector,
	closeTaskForm,
	openTaskForm,
	taskFormModeSelector,
	taskFormOpenedSelector,
} from "../../data/tasks/tasks";
import { TaskFilter } from "../filter/task-filter";
import { ModalDialog } from "../modal/modal-dialog";
import { TaskForm } from "./task-form";
import { TasksList } from "./tasks-list";

export function TasksPage(props: { mode: "todo" | "done" }) {
	const dispatch = useDispatch();
	const taskFormOpened = useSelector(taskFormOpenedSelector);
	const taskFormMode = useSelector(taskFormModeSelector);
	const clickedTask = useSelector(clickedTaskSelector);
	const handleCloseTaskForm = () => {
		dispatch(closeTaskForm());
	};
	const handleCreateTaskClick = () => {
		dispatch(openTaskForm({ taskFormMode: "edit" }));
	};
	return (
		<>
			<ModalDialog
				handleClose={handleCloseTaskForm}
				show={taskFormOpened}
				title={deriveFormTitle(taskFormMode, !!clickedTask)}
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

function deriveFormTitle(
	taskFormMode: "readonly" | "edit",
	clickedTask?: boolean
) {
	if (taskFormMode === "readonly") {
		return "View task";
	} else if (clickedTask) {
		return "Edit task";
	} else {
		return "Create new task";
	}
}
