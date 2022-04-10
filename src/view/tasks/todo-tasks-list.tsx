import * as React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Task } from "../../data/tasks/tasks";
import "./tasks-list.css";

export function TodoTasksList(props: { tasks: Task[] }) {
	if (props.tasks.length === 0) {
		return <p>No tasks to do. Start by creating a new task.</p>;
	}
	return (
		<>
			{props.tasks.map((task) => (
				<TodoTask key={task.id} task={task} />
			))}
		</>
	);
}

function TodoTask(props: { task: Task }) {
	return (
		<Card className="task">
			<Card.Body>
				<Row>
					<Col>{props.task.title}</Col>
					<Col>
						{props.task.assignee?.firstName +
							" " +
							props.task.assignee?.lastName}
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}
