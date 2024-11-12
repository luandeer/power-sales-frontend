'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ChevronLeft, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { useCreateOrUpdateTask } from '@/common/api/useTask';
import { Task } from '@/common/interfaces';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
const formSchema = z.object({
	name: z.string().min(2, {
		message: ' name must be at least 2 characters.',
	}),
	description: z.string().min(2, {
		message: ' name must be at least 2 characters.',
	}),
	expirationDate: z.date({
		required_error: 'A date of birth is required.',
	}),
});

export default function UserForm({
	initialData,
	pageTitle,
	buttonTitle,
}: {
	initialData: Task | null;
	pageTitle: string;
	buttonTitle: string;
}) {
	const router = useRouter();

	const { mutation } = useCreateOrUpdateTask();
	const [expirationDate, setExpirationDate] = useState(
		initialData?.expirationDate
			? new Date(initialData.expirationDate)
			: new Date()
	);
	// Evita el ciclo infinito al manejar dependencias de manera cuidadosa
	useEffect(() => {
		if (
			initialData?.expirationDate &&
			new Date(initialData.expirationDate).getTime() !==
				expirationDate.getTime()
		) {
			setExpirationDate(new Date(initialData.expirationDate));
		}
	}, [initialData?.expirationDate, expirationDate]);

	const defaultValues = {
		name: initialData?.name || '',
		description: initialData?.description || '',
		expirationDate: expirationDate,
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log('user:', values);
		try {
			const id = initialData?.id?.toString();

			await mutation.mutateAsync({ id, newTask: values });
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	}

	return (
		<div className="container mx-auto pb-10 pt-5">
			<button
				className="hover:underline text-sm mb-4 flex items-center "
				onClick={() => router.back()}
			>
				<span>
					<ChevronLeft className="size-4 mr-1" />
				</span>{' '}
				Volver
			</button>
			<h1 className="text-xl font-semibold mb-4">{pageTitle}</h1>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre de la tarea</FormLabel>
										<FormControl>
											<Input placeholder="Escriba el nombre" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="expirationDate"
								render={({ field }) => (
									<FormItem className="flex flex-col gap-2.5">
										<FormLabel>
											Fecha de vencimiento{' '}
											<span className="text-xs">
												(Fecha de hoy por defecto)
											</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={
														field.value ? new Date(field.value) : undefined
													}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>

										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
								control={form.control}
								name="expirationDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={field.name}>
											Fecha de experiración
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													id={field.name}
													type="text"
													placeholder="elija una fecha"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe la tarea que vas a realizar"
											className="resize-none"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={mutation.isPending}>
							{mutation.isPending ? (
								<span className="flex items-center gap-2">
									{' '}
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									cargando
								</span>
							) : (
								buttonTitle
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
