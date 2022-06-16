import * as React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter, setFilter } from "../../data/filter/filter";
import { usersSelector } from "../../data/users/users";

export function TaskFilter() {
	const dispatch = useDispatch();
	const users = useSelector(usersSelector);
	const [title, setTitle] = React.useState("");
	const [userId, setUserId] = React.useState<string | undefined>(undefined);
	const [dirty, setDirty] = React.useState(false);
	const handleAssigneeChange: React.ChangeEventHandler<HTMLSelectElement> = (
		event
	) => {
		setUserId(event.target.value);
		setDirty(true);
		if (!event.target.value && title === "") {
			dispatch(removeFilter());
		}
	};
	const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setTitle(event.target.value);
		setDirty(true);
		if (event.target.value === "" && !userId) {
			dispatch(removeFilter());
		}
	};
	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		handleSubmit();
	};
	const handleSubmit = () => {
		dispatch(
			setFilter({
				taskTitle: title,
				userId,
			})
		);
		setDirty(false);
	};
	const isEmpty = !userId && title === "";
	return (
		<Form className="d-flex" onSubmit={handleFormSubmit}>
			<FormControl
				type="search"
				placeholder="Task title"
				className="me-2"
				aria-label="Search"
				value={title}
				data-testid="title-search"
				onChange={handleTitleChange}
			/>
			<Form.Select
				aria-label="Assignee"
				onChange={handleAssigneeChange}
				value={userId}
				className="me-2"
				data-testid="assignee-search"
			>
				<option></option>
				{users.map((user) => (
					<option key={user.id} value={user.id}>
						{user.firstName + " " + user.lastName}
					</option>
				))}
			</Form.Select>
			<Button
				onClick={handleSubmit}
				disabled={isEmpty || !dirty}
				variant="success"
			>
				Search
			</Button>
		</Form>
	);
}
