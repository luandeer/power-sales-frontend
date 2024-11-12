'use client';

import { Task } from '@/common/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Nombre de la tarea',
	},
	{
		accessorKey: 'description',
		header: 'Descripcion',
	},
	{
		accessorKey: 'expirationDate',
		header: 'Fecha de vencimiento',
		cell: ({ row }) => {
			const date = new Date(row.original.expirationDate);
			const formattedDate = new Intl.DateTimeFormat('es-ES', {
				dateStyle: 'long',
				timeStyle: 'short',
				hour12: true,
			}).format(date);

			return <div>{formattedDate}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
