import Link from "next/link";
import React, { Fragment } from "react";

type Props = {
	photos: Record<string, any>[];
	wrapClass?: string;
	imgClass?: string;
	imgAlt?: string;
	placeholder?: string;
};

export const ElemPhoto: React.FC<Props> = ({
	photos,
	wrapClass,
	imgAlt,
	imgClass,
	placeholder,
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
			) : placeholder === "user" ? (
				<Fragment>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`text-primary-100 ${imgClass}`}
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
							clipRule="evenodd"
						/>
					</svg>
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
