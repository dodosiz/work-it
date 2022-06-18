import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../data/notifications/notifications";
import {
	clickedTaskSelector,
	closeTaskForm,
	createTask,
	taskFormModeSelector,
} from "../../data/tasks/tasks";
import { usersSelector } from "../../data/users/users";

export function TaskForm() {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector);
	const clickedTask = useSelector(clickedTaskSelector);
	const readOnly = useSelector(taskFormModeSelector) === "readonly";
	const [title, setTitle] = React.useState(
		clickedTask ? clickedTask.title : ""
	);
	const [description, setDescription] = React.useState(
		clickedTask ? clickedTask?.description : ""
	);
	const [userId, setUserId] = React.useState<string | undefined>(
		clickedTask ? clickedTask.assignee?.id : undefined
	);
	const [dirty, setDirty] = React.useState(false);
	const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setTitle(event.target.value);
		setDirty(true);
	};
	const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setDescription(event.target.value);
		setDirty(true);
	};
	const handleAssigneeChange: React.ChangeEventHandler<HTMLSelectElement> = (
		event
	) => {
		setUserId(event.target.value);
		setDirty(true);
	};
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (!readOnly) {
			const assignee = users.find((user) => user.id === userId);
			dispatch(createTask({ title, description, assignee }));
			dispatch(
				addNotification({
					message: `Created task: ${title}`,
				})
			);
			dispatch(closeTaskForm());
		}
	};
	const handleCancel = () => {
		dispatch(closeTaskForm());
	};
	const submitDisabled = () => {
		return !isValid() || !dirty;
	};
	const isValid = () => {
		return title && userId;
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title:</Form.Label>
				<Form.Control
					readOnly={readOnly}
					type="text"
					value={title}
					onChange={handleTitleChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="description">
				<Form.Label>Description:</Form.Label>
				<Form.Control
					type="textarea"
					readOnly={readOnly}
					value={description}
					onChange={handleDescriptionChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="assignee">
				<Form.Select
					aria-label="Assignee"
					onChange={handleAssigneeChange}
					disabled={readOnly}
					value={userId}
					data-testid="assignee"
				>
					<option></option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.firstName + " " + user.lastName}
						</option>
					))}
				</Form.Select>
			</Form.Group>
			{!readOnly && (
				<>
					<Button
						className="me-2"
						disabled={submitDisabled()}
						variant="primary"
						type="submit"
					>
						Save
					</Button>
					<Button variant="secondary" onClick={() => handleCancel()}>
						Cancel
					</Button>
				</>
			)}
		</Form>
	);
}
