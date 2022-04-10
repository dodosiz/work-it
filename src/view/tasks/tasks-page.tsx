import * as React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	closeTaskForm,
	openTaskForm,
	taskFormOpenedSelector,
	tasksSelector,
} from "../../data/tasks/tasks";
import { ModalDialog } from "../modal/modal-dialog";
import { TaskForm } from "./task-form";

export function TasksPage() {
	const dispatch = useDispatch();
	const tasks = useSelector(tasksSelector);
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
						<Button variant="success" onClick={handleCreateTaskClick}>
							Create Task
						</Button>
					</Nav>
				</Container>
			</Navbar>
			<Container>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							{task.title} -{" "}
							{task.assignee?.firstName + " " + task.assignee?.lastName}
						</li>
					))}
				</ul>
			</Container>
		</>
	);
}
