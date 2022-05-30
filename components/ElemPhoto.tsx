import Link from "next/link";
import React, { Fragment } from "react";

type Props = {
	photos: Record<string, any>[];
	wrapClass?: string;
	imgClass?: string;
	imgAlt?: string;
};

export const ElemPhoto: React.FC<Props> = ({
	photos,
	wrapClass,
	imgAlt,
	imgClass,
}) => {
	return (
		<div className={wrapClass}>
			{photos ? (
				<Fragment>
					{photos.map((photo) => {
						return (
							<img
								key={photo.id}
								src={photo.url}
								className={imgClass}
								alt={imgAlt}
								title={imgAlt}
							/>
						);
					})}
				</Fragment>
			) : (
				<Fragment>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`text-primary-100 ${imgClass}`}
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clipRule="evenodd"
						/>
					</svg>
				</Fragment>
			)}
		</div>
	);
};
