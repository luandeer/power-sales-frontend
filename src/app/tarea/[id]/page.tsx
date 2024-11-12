import TaskView from '@/components/personalized/TaskView';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <TaskView taskId={id} />;
}
