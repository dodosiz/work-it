import * as React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import {
	BsCheckCircle,
	BsCheckCircleFill,
	BsFillTrashFill,
	BsPencilFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../data/notifications/notifications";
import {
	deleteTask,
	finishTask,
	openTaskForm,
	Task,
	tasksSelector,
} from "../../data/tasks/tasks";
import "./tasks-list.css";

export function TasksList(props: { mode: "todo" | "done" }) {
	const tasks = useSelector(tasksSelector(props.mode));
	if (tasks.length === 0) {
		return (
			<p>
				{props.mode === "todo" ? "No tasks found." : "No finished tasks found."}
			</p>
		);
	}
	return (
		<>
			{tasks.sort(sortByDate).map((task) => (
				<TaskCard key={task.id} task={task} mode={props.mode} />
			))}
		</>
	);
}

function sortByDate(task1: Task, task2: Task) {
	if (task1.dateFinished && task2.dateFinished) {
		return task2.dateFinished.localeCompare(task1.dateFinished);
	} else {
		return 0;
	}
}

interface TaskCardProps {
	mode: "todo" | "done";
	task: Task;
}

function TaskCard(props: TaskCardProps) {
	const fadeOutTimeout = 1500; // a little faster then the CSS transition
	const [checked, setChecked] = React.useState(false);
	const dispatch = useDispatch();
	const handleCheck = () => {
		setChecked(true);
		setTimeout(() => {
			dispatch(finishTask({ taskId: props.task.id }));
		}, fadeOutTimeout);
	};
	const handleEdit = () => {
		dispatch(
			openTaskForm({
				taskFormMode: "edit",
				clickedTask: props.task,
			})
		);
	};
	const handleDelete = () => {
		dispatch(deleteTask({ taskId: props.task.id }));
		dispatch(
			addNotification({
				message: `Deleted task "${props.task.title}".`,
			})
		);
	};
	const handleTitleClick = () => {
		dispatch(
			openTaskForm({
				taskFormMode: "readonly",
				clickedTask: props.task,
			})
		);
	};
	return (
		<Card className="task" style={checked ? { opacity: "0%" } : {}}>
			<Card.Body>
				<Row>
					<Col md={1}>
						<CheckBox
							taskId={props.task.id}
							checked={props.mode === "todo" ? checked : true}
							handleCheck={props.mode === "todo" ? handleCheck : undefined}
						/>
					</Col>
					<Col md={5}>
						<span
							className="pointer"
							data-testid={`title-${props.task.id}`}
							onClick={handleTitleClick}
						>
							{props.task.title}
						</span>
					</Col>
					<Col md={4}>
						{props.task.assignee?.firstName +
							" " +
							props.task.assignee?.lastName}
					</Col>
					{props.mode === "done" && (
						<Col md={2}>{`Finished on: ${props.task.dateFinished}`}</Col>
					)}
					{props.mode === "todo" && (
						<Col md={2}>
							<Button
								data-testid={`edit-button-${props.task.id}`}
								variant="outline-primary"
								className="me-2"
								onClick={handleEdit}
							>
								<BsPencilFill />
							</Button>
							<Button
								data-testid={`delete-button-${props.task.id}`}
								variant="outline-danger"
								onClick={handleDelete}
							>
								<BsFillTrashFill />
							</Button>
						</Col>
					)}
				</Row>
			</Card.Body>
		</Card>
	);
}

interface CheckBoxProps {
	taskId: string;
	checked: boolean;
	handleCheck?: () => void;
}

function CheckBox(props: CheckBoxProps) {
	return (
		<div
			className={`${props.checked ? "done" : "undone"}`}
			data-testid={`check-${props.taskId}`}
		>
			{!props.checked && (
				<BsCheckCircle
					className="pointer"
					onClick={props.handleCheck}
					size={"1.5em"}
					data-testid={`check-box-${props.taskId}`}
				/>
			)}
			{props.checked && <BsCheckCircleFill size={"1.5em"} />}
		</div>
	);
}
