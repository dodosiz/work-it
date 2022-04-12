import * as React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { finishTask, Task, toDoTasksSelector } from "../../data/tasks/tasks";
import "./tasks-list.css";

export function TasksList() {
	const tasks = useSelector(toDoTasksSelector);
	if (tasks.length === 0) {
		return <p>No tasks to do. Start by creating a new task.</p>;
	}
	return (
		<>
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</>
	);
}

function TaskCard(props: { task: Task }) {
	const fadeOutTimeout = 1500; // a little faster then the CSS transition
	const [checked, setChecked] = React.useState(false);
	const dispatch = useDispatch();
	const handleCheck = () => {
		setChecked(true);
		setTimeout(() => {
			dispatch(finishTask({ taskId: props.task.id }));
		}, fadeOutTimeout);
	};
	return (
		<Card className="task" style={checked ? { opacity: "0%" } : {}}>
			<Card.Body>
				<Row>
					<Col md={2}>
						<CheckBox
							taskId={props.task.id}
							checked={checked}
							handleCheck={handleCheck}
						/>
					</Col>
					<Col md={5}>{props.task.title}</Col>
					<Col md={5}>
						{props.task.assignee?.firstName +
							" " +
							props.task.assignee?.lastName}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

interface CheckBoxProps {
	taskId: string;
	checked: boolean;
	handleCheck(): void;
}

function CheckBox(props: CheckBoxProps) {
	return (
		<div
			className={`check ${props.checked ? "done" : "undone"}`}
			onClick={() => props.handleCheck()}
			data-testid={`check-${props.taskId}`}
		>
			{!props.checked && <BsCheckCircle size={"1.5em"} />}
			{props.checked && <BsCheckCircleFill size={"1.5em"} />}
		</div>
	);
}
