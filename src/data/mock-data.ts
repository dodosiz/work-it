import { v4 } from "uuid";
import { AppState } from "./store";

export const DATA: AppState = {
	notifications: {
		message: undefined,
	},
	usersState: {
		userFormOpened: false,
		userIdToEdit: undefined,
		users: [
			{
				id: v4(),
				firstName: "Alejandro",
				lastName: "Matthews",
				role: "Project manager",
			},
			{
				id: v4(),
				firstName: "Mai",
				lastName: "Yoder",
				role: "UI/UX designer",
			},
			{
				id: v4(),
				firstName: "Wade",
				lastName: "Delgado",
				role: "Marketing",
			},
			{
				id: v4(),
				firstName: "Angeline",
				lastName: "Shea",
				role: "Senior front end developer",
			},
			{
				id: v4(),
				firstName: "Claudine",
				lastName: "Martin",
				role: "Section back end developer",
			},
			{
				id: v4(),
				firstName: "Cruz",
				lastName: "Russo",
				role: "DevOps",
			},
			{
				id: v4(),
				firstName: "Erik",
				lastName: "Ferguson",
				role: "Business analyst",
			},
			{
				id: v4(),
				firstName: "Charles",
				lastName: "Harrell",
				role: "Data analyst",
			},
			{
				id: v4(),
				firstName: "Lonnie",
				lastName: "Wade",
				role: "Security engineer",
			},
			{
				id: v4(),
				firstName: "Cassie",
				lastName: "Chung",
				role: "Quality assurance",
			},
			{
				id: v4(),
				firstName: "Dana",
				lastName: "Montes",
				role: "Junior developer",
			},
			{
				id: v4(),
				firstName: "Ladonna",
				lastName: "Ponce",
				role: "Junior developer",
			},
		],
	},
};
