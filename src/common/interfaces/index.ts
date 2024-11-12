/* eslint-disable @typescript-eslint/no-explicit-any */
export type Task = {
	id?: number;
	name: string;
	description: string;
	expirationDate: any;
	createdAt?: string;
	updatedAt?: string;
};
