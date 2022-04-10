import * as React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { UsersPage } from "./users/users-page";
import { NotificationAlert } from "./notifications/notification-alert";
import { TasksPage } from "./tasks/tasks-page";

type Page = "tasks" | "users";

export function App() {
	const [page, setPage] = React.useState<Page>("tasks");
	return (
		<div>
			<Navbar expand="lg" variant="dark" bg="dark">
				<Container>
					<Navbar.Brand style={{ color: "lightblue" }}>Work IT</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link
								active={page === "tasks"}
								onClick={() => setPage("tasks")}
							>
								To Do Tasks
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
			{page === "tasks" && <TasksPage />}
			{page === "users" && <UsersPage />}
			<NotificationAlert />
		</div>
	);
}
