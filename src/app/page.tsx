import { TableView } from '@/components/personalized/TableView';

export default function Home() {
	return (
		<div className="">
			<main className="container mx-auto my-10">
				<TableView />
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				Prueba Técnica
			</footer>
		</div>
	);
}
