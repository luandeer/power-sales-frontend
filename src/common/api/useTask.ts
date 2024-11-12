//lado del cliente
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces';

const { getTask, createTask, getTaskById, updateTask, deleteTask } =
	TaskService();

export const useTask = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['tasks'],
		queryFn: getTask,
	});

	return { data, isLoading, isError };
};

export const useTaskById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['taskId', id],
		queryFn: () => getTaskById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateTask = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: { id?: string; newTask: Omit<Task, 'id'> }) => {
			if (data.id) {
				return await updateTask(data.newTask, data.id);
			} else {
				return await createTask(data.newTask);
			}
		},
		onSuccess: () => {
			router.push('/');
		},
		onError: (error) => {
			console.error('Error al crear o editar tarea:', error);
		},
	});

	return { mutation };
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteTask(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar tarea', error);
		},
	});

	return { mutation };
};
