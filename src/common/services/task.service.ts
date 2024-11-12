import { Task } from '../interfaces';
import { httpsRequest } from './http-request.service';

export const TaskService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getTask = async (): Promise<Task[]> => {
		configRequest({ endpoint: 'task' });
		const res = await get<Task[]>();
		return res;
	};

	const getTaskById = async (id: string): Promise<Task> => {
		configRequest({ endpoint: `task/${id}` });
		const res = await get<Task>();
		return res;
	};

	const createTask = async (data: Task): Promise<Task> => {
		configRequest({ endpoint: 'task' });
		const res = await post<Task>(data);

		return res;
	};
	const updateTask = async (data: Task, id: string): Promise<Task> => {
		configRequest({ endpoint: `task/${id}` });
		const res = await put<Task>(data);

		return res;
	};
	const deleteTask = async (id: string): Promise<void> => {
		configRequest({ endpoint: `task/${id}` });
		await deleteRequest();
	};

	return {
		getTask,
		getTaskById,
		createTask,
		updateTask,
		deleteTask,
	};
};
