import * as React from "react";
import { Alert, Fade } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	clearNotification,
	notificationSelector,
} from "../../data/notifications/notifications";
import "./notification-alert.css";

export function NotificationAlert() {
	const notificationTimeout = 2000;
	const dispatch = useDispatch();
	const notification = useSelector(notificationSelector);
	const show = !!notification;
	const fadeOut = () => {
		setTimeout(() => {
			dispatch(clearNotification());
		}, notificationTimeout);
	};
	const handleClose = () => {
		dispatch(clearNotification());
	};
	return (
		<Fade in={show} timeout={notificationTimeout} onEntered={() => fadeOut()}>
			<Alert
				className="notification-alert"
				dismissible
				show={show}
				variant="success"
				onClose={() => handleClose()}
			>
				{notification}
			</Alert>
		</Fade>
	);
}
