import * as React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export function TasksPage() {
	return (
		<>
			<Navbar expand="lg" variant="light" bg="light">
				<Container>
					<Nav className="me-auto">
						<Button variant="success">Create Task</Button>
					</Nav>
				</Container>
			</Navbar>
			<Container>Nothing to display yet</Container>
		</>
	);
}
