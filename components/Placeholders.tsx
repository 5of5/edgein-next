export const PlaceholderCompanyCard: React.FC = () => {
	return (
		<div className="flex flex-col animate-pulse-fast p-5 bg-white rounded-lg md:h-full">
			<div className="flex items-center shrink-0 mb-4 w-full">
				<div className="aspect-square rounded-lg bg-slate-200 w-16 h-16"></div>
				<div className="flex-1 ml-2 h-6 max-w-full bg-slate-200 rounded"></div>
			</div>
			<div className="flex-1 space-y-4 py-1">
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded w-2/3"></div>
			</div>
			<div className="mt-8 grid grid-cols-2 gap-4">
				<div className="flex items-center space-x-2">
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
				</div>
				<div className="flex items-center justify-end space-x-2">
					<div className="rounded-full h-7 w-20 bg-slate-200"></div>
				</div>
			</div>
		</div>
	);
};

export const PlaceholderActivity: React.FC = () => {
	return (
		<div className="flex flex-col animate-pulse-fast p-1 mb-6 bg-white rounded-lg md:h-full">
			<div className="flex items-center shrink-0 w-full mb-3 space-x-2">
				<div className="aspect-square rounded-full bg-slate-200 w-2 h-2"></div>
				<div className="flex-1 h-2 max-w-full bg-slate-200 rounded"></div>
			</div>
			<div className="flex-1 space-y-4 ml-4 py-1">
				<div className="h-2 bg-slate-200 rounded w-1/12"></div>
			</div>
		</div>
	);
};

export const PlaceholderTable: React.FC = () => {
	return (
		<>
			<table className="animate-pulse-fast table-auto min-w-full divide-y divide-black/10 overscroll-x-none">
				<thead>
					<tr className="grid grid-cols-5 gap-16 w-full p-4">
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
					</tr>
				</thead>
				<tbody className="spacing-y-6 bg-white divide-y divide-black/10">
					<tr className="grid grid-cols-5 gap-16 items-center p-4">
						<th className="">
							<div className="flex items-center shrink-0 w-full">
								<div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
								<div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
							</div>
						</th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="">
							<div className="flex items-center shrink-0 w-full space-x-6">
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
							</div>
						</th>
					</tr>
					<tr className="grid grid-cols-5 gap-16 items-center p-4">
						<th className="">
							<div className="flex items-center shrink-0 w-full">
								<div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
								<div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
							</div>
						</th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="">
							<div className="flex items-center shrink-0 w-full space-x-6">
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
							</div>
						</th>
					</tr>
					<tr className="grid grid-cols-5 gap-16 items-center p-4">
						<th className="">
							<div className="flex items-center shrink-0 w-full">
								<div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
								<div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
							</div>
						</th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="">
							<div className="flex items-center shrink-0 w-full space-x-6">
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
							</div>
						</th>
					</tr>
					<tr className="grid grid-cols-5 gap-16 items-center p-4">
						<th className="">
							<div className="flex items-center shrink-0 w-full">
								<div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
								<div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
							</div>
						</th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="">
							<div className="flex items-center shrink-0 w-full space-x-6">
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
							</div>
						</th>
					</tr>
					<tr className="grid grid-cols-5 gap-16 items-center p-4">
						<th className="">
							<div className="flex items-center shrink-0 w-full">
								<div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
								<div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
							</div>
						</th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="h-2 bg-slate-200 rounded"></th>
						<th className="">
							<div className="flex items-center shrink-0 w-full space-x-6">
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
								<div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
							</div>
						</th>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export const PlaceholderInvestorCard: React.FC = () => {
	return (
		<div className="flex flex-col animate-pulse-fast p-5 bg-white border border-dark-500/10 rounded-lg md:h-full">
			<div className="flex items-center shrink-0 mb-4 w-full">
				<div className="aspect-square rounded-lg bg-slate-200 w-16 h-16"></div>
				<div className="flex-1 ml-2 h-6 max-w-full bg-slate-200 rounded"></div>
			</div>
			<div className="flex-1 space-y-4 py-1">
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded w-2/3"></div>
			</div>
			<div className="mt-8">
				<div className="flex items-center justify-between">
					<div className="aspect-square rounded-lg h-2 w-2/5 bg-slate-200"></div>
					<div className="aspect-square rounded-lg h-2 w-2/5 bg-slate-200"></div>
				</div>
			</div>
		</div>
	);
};
