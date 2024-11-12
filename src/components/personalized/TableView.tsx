'use client';
import { useTask } from '@/common/api/useTask';
import { columns } from './table/columns';
import { DataTable } from './table/data-table';

export function TableView() {
	const { data } = useTask();
	return (
		<div className="flex flex-col gap-2">
			<div>
				<h1 className="text-xl font-semibold">Gestión de Tareas!</h1>
				<p className="text-sm">Crea,lista, actualiza y elimina tus tareas.</p>
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	);
}
