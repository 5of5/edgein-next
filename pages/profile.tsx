import { useAuth } from "../hooks/useAuth";

export default function Profile() {
	const { user, error, loading } = useAuth();

	return (
		<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
			<div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="bg-white rounded-2xl border border-dark-500/10 p-6">
							<h1 className="text-3xl lg:text-4xl font-bold">
                Email: { user?.email }
							</h1>
				</div>
			</div>
		</div>
	);
}
