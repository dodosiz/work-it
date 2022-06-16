import * as React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { finishTask, Task, tasksSelector } from "../../data/tasks/tasks";
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
	return (
		<Card className="task" style={checked ? { opacity: "0%" } : {}}>
			<Card.Body>
				<Row>
					<Col md={2}>
						<CheckBox
							taskId={props.task.id}
							checked={props.mode === "todo" ? checked : true}
							handleCheck={props.mode === "todo" ? handleCheck : undefined}
						/>
					</Col>
					<Col md={props.mode === "todo" ? 5 : 4}>{props.task.title}</Col>
					<Col md={props.mode === "todo" ? 5 : 4}>
						{props.task.assignee?.firstName +
							" " +
							props.task.assignee?.lastName}
					</Col>
					{props.mode === "done" && (
						<Col md={2}>{`Finished on: ${props.task.dateFinished}`}</Col>
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
					className="check"
					onClick={props.handleCheck}
					size={"1.5em"}
					data-testid={`check-box-${props.taskId}`}
				/>
			)}
			{props.checked && <BsCheckCircleFill size={"1.5em"} />}
		</div>
	);
}
