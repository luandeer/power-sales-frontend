/* eslint-disable @typescript-eslint/no-explicit-any */

//lado del servidor
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getTask() {
	const data = await fetch(`${BACKEND_URL}/api/task`, {
		cache: 'no-store',
	});
	return await data.json();
}

export async function getTaskId(id: string) {
	const data = await fetch(`${BACKEND_URL}/api/task/${id}`, {
		cache: 'no-store',
	});
	return await data.json();
}

export async function createTask(taskData: any) {
	const res = await fetch(`${BACKEND_URL}/api/task`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(taskData),
	});
	const data = await res.json();
	console.log(data);
}

export async function deleteTask(id: string) {
	const res = await fetch(`${BACKEND_URL}/api/task/${id}`, {
		method: 'DELETE',
	});
	return await res.json();
}

export async function updateTask(id: string, newtask: any) {
	const res = await fetch(`${BACKEND_URL}/api/task/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newtask),
		cache: 'no-store',
	});
	return await res.json();
}
