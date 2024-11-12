'use client';
import { useTaskById } from '@/common/api/useTask';
import UserForm from './Form';

type TProductViewPageProps = {
	taskId: string;
};

export default function TaskView({ taskId }: TProductViewPageProps) {
	const isNewProduct = taskId === 'nuevo';

	const {
		data: task = null,
		isLoading,
		isError,
	} = useTaskById(taskId, isNewProduct);

	if (isLoading) return <h1>cargandooo...</h1>;
	if (isError) return <h1>error...</h1>;
	const pageTitle = isNewProduct ? 'Crear Tarea' : 'Editar Tarea';
	const buttonTitle = isNewProduct ? 'Crear' : 'Editar';
	return (
		<UserForm
			initialData={task}
			pageTitle={pageTitle}
			buttonTitle={buttonTitle}
		/>
	);
}
