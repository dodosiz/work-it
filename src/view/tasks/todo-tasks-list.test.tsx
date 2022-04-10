import * as React from "react";
import { Task } from "../../data/tasks/tasks";
import { TodoTasksList } from "./todo-tasks-list";
import { render } from "@testing-library/react";

describe("Todo tasks list:", () => {
	test("Snapshot test", () => {
		const tasks: Task[] = [
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
		];
		const component = render(<TodoTasksList tasks={tasks} />);
		expect(component.container).toMatchSnapshot();
	});
});
