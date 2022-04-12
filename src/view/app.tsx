import * as React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { UsersPage } from "./users/users-page";
import { NotificationAlert } from "./notifications/notification-alert";
import { TasksPage } from "./tasks/tasks-page";

type Page = "tasks-todo" | "tasks-done" | "users";

export function App() {
	const [page, setPage] = React.useState<Page>("tasks-todo");
	return (
		<div>
			<Navbar expand="lg" variant="dark" bg="dark">
				<Container>
					<Navbar.Brand style={{ color: "lightblue" }}>Work IT</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link
								active={page === "tasks-todo"}
								onClick={() => setPage("tasks-todo")}
							>
								To Do
							</Nav.Link>
							<Nav.Link
								active={page === "tasks-done"}
								onClick={() => setPage("tasks-done")}
							>
								Done
							</Nav.Link>
							<Nav.Link
								active={page === "users"}
								onClick={() => setPage("users")}
							>
								Roles
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{page === "tasks-todo" && <TasksPage mode="todo" />}
			{page === "tasks-done" && <TasksPage mode="done" />}
			{page === "users" && <UsersPage />}
			<NotificationAlert />
		</div>
	);
}
