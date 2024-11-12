'use client';
import { useDeleteTask } from '@/common/api/useTask';
import { Task } from '@/common/interfaces';
import { DeleteIcon, Edit, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface CellActionProps {
	data: Task;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const { mutation } = useDeleteTask();
	const id = data.id?.toString();

	const handleDelete = async () => {
		if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
			await mutation.mutateAsync(id!);
		}
	};
	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Acciones</DropdownMenuLabel>

					<DropdownMenuItem onClick={() => router.push(`/tarea/${data.id}`)}>
						<Edit className="mr-2 h-4 w-4" /> Editar
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleDelete}>
						<DeleteIcon className="mr-2 h-4 w-4" /> Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
