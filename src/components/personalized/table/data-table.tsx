'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from './Pagination';

interface DataTableProps<TData extends { id?: number | string }, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData extends { id?: number | string }, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	const handleDeleteSelectedRows = async () => {
		const selectedRowIds = table
			.getSelectedRowModel()
			.rows.map((row) => row.original.id);
		confirm(
			`¿Estás seguro de que deseas eliminar estos ids -> ${selectedRowIds}? `
		);
		// await mutation.mutateAsync(selectedRowIds as string[]);
		// console.log(selectedRowIds);
	};
	const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Input
					placeholder="Filtrar por nombre de la tarea..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className="max-w-sm rounded-xl"
				/>
				<div className="flex items-center gap-2">
					{hasSelectedRows && (
						<button
							onClick={handleDeleteSelectedRows}
							className="bg-red-500 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-1"
						>
							Eliminar <span>({table.getSelectedRowModel().rows.length})</span>
						</button>
					)}
					<Link
						href="/tarea/nuevo"
						className="flex items-center gap-2 bg-gray-800 text-white rounded-xl px-4 py-2 text-sm"
					>
						+ Agregar
					</Link>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
