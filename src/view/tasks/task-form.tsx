import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../data/notifications/notifications";
import { closeTaskForm, createTask } from "../../data/tasks/tasks";
import { usersSelector } from "../../data/users/users";

export function TaskForm() {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector);
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [userId, setUserId] = React.useState<string | undefined>(undefined);
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
		const assignee = users.find((user) => user.id === userId);
		dispatch(createTask({ title, description, assignee }));
		dispatch(
			addNotification({
				message: `Created task: ${title}`,
			})
		);
		dispatch(closeTaskForm());
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
				<Form.Control type="text" value={title} onChange={handleTitleChange} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="description">
				<Form.Label>Description:</Form.Label>
				<Form.Control
					type="textarea"
					value={description}
					onChange={handleDescriptionChange}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="assignee">
				<Form.Select
					aria-label="Assignee"
					onChange={handleAssigneeChange}
					value={userId}
					data-testid="assignee"
				>
					<option>Assignee</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.firstName + " " + user.lastName}
						</option>
					))}
				</Form.Select>
			</Form.Group>
			<Button disabled={submitDisabled()} variant="primary" type="submit">
				Save
			</Button>{" "}
			<Button variant="secondary" onClick={() => handleCancel()}>
				Cancel
			</Button>
		</Form>
	);
}
