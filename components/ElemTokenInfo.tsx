import { PropsWithChildren } from "react";

type Props = {
	title: string;
	tokenInfo: string;
};

export const ElemTokenInfo: React.FC<PropsWithChildren<Props>> = ({
	title,
	tokenInfo,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<div className="text-slate-600">{title}</div>
				<div className="bg-green-100 text-green-500 text-sm font-semibold border-none rounded-2xl py-1 px-2">
					{tokenInfo}
				</div>
		</div>
	);
};
