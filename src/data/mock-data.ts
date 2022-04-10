import { AppState } from "./store";

export const DATA: AppState = {
	notifications: {
		message: undefined,
	},
	tasksState: {
		tasks: [
			{
				id: "task1",
				assignee: {
					id: "user1",
					firstName: "Alejandro",
					lastName: "Matthews",
					role: "Project manager",
				},
				title: "Plan the requirements for the next release.",
				dateFinished: undefined,
				description: "",
			},
			{
				id: "task2",
				assignee: {
					id: "user1",
					firstName: "Alejandro",
					lastName: "Matthews",
					role: "Project manager",
				},
				title: "Meet with the stakeholders to discuss the new requirements.",
				dateFinished: undefined,
				description: "",
			},
			{
				id: "task3",
				assignee: {
					id: "user2",
					firstName: "Mai",
					lastName: "Yoder",
					role: "UI/UX designer",
				},
				title: "Design the mocks for the new user interface.",
				dateFinished: undefined,
				description: "",
			},
			{
				id: "task4",
				assignee: {
					id: "user7",
					firstName: "Erik",
					lastName: "Ferguson",
					role: "Business analyst",
				},
				title: "Analyse the dependencies between the upcomming requirements.",
				dateFinished: undefined,
				description: "",
			},
		],
		taskFormOpened: false,
	},
	usersState: {
		userFormOpened: false,
		userIdToEdit: undefined,
		users: [
			{
				id: "user1",
				firstName: "Alejandro",
				lastName: "Matthews",
				role: "Project manager",
			},
			{
				id: "user2",
				firstName: "Mai",
				lastName: "Yoder",
				role: "UI/UX designer",
			},
			{
				id: "user3",
				firstName: "Wade",
				lastName: "Delgado",
				role: "Marketing",
			},
			{
				id: "user4",
				firstName: "Angeline",
				lastName: "Shea",
				role: "Senior front end developer",
			},
			{
				id: "user5",
				firstName: "Claudine",
				lastName: "Martin",
				role: "Section back end developer",
			},
			{
				id: "user6",
				firstName: "Cruz",
				lastName: "Russo",
				role: "DevOps",
			},
			{
				id: "user7",
				firstName: "Erik",
				lastName: "Ferguson",
				role: "Business analyst",
			},
			{
				id: "user8",
				firstName: "Charles",
				lastName: "Harrell",
				role: "Data analyst",
			},
			{
				id: "user9",
				firstName: "Lonnie",
				lastName: "Wade",
				role: "Security engineer",
			},
			{
				id: "user10",
				firstName: "Cassie",
				lastName: "Chung",
				role: "Quality assurance",
			},
			{
				id: "user11",
				firstName: "Dana",
				lastName: "Montes",
				role: "Junior developer",
			},
			{
				id: "user12",
				firstName: "Ladonna",
				lastName: "Ponce",
				role: "Junior developer",
			},
		],
	},
};
