import * as React from "react";
import { Modal } from "react-bootstrap";

interface ModalDialogProps {
	children: React.ReactElement;
	show: boolean;
	title: string;
	handleClose(): void;
}

export function ModalDialog(props: ModalDialogProps) {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
		</Modal>
	);
}
