import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { InputText } from "@/components/input-text";
import { ElemButton } from "@/components/elem-button";
import { FigureBlurredBg, FigurePerspectiveGrid } from "@/components/figures";
import { IconChevronDownMini } from "@/components/icons";

const AskEdgein: NextPage = () => {
	const [query, setQuery] = useState("");
	const [queryRes, setQueryRes] = useState("");
	const [queryResJson, setQueryResJson] = useState(null);
	const [loading, setLoading] = useState(false);
	const [enableExpand, setEnableExpand] = useState(false);

	const onSubmit = async (e: { preventDefault: () => void }) => {
		if (e) e.preventDefault();
		setLoading(true);
		try {
			const queryRes = await fetch(`/api/query/completions/`, {
				method: "POST",
				body: JSON.stringify({
					query,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const json = await queryRes.json();
			console.log(json);
			setQueryResJson(json);
			if (!queryRes.ok) {
				setQueryRes("Error");
			} else {
				setQueryRes(json.answer);
			}
			setLoading(false);
		} catch (err) {
			console.log(err);
			setQueryRes("Error");
			setLoading(false);
		}
	};

	return (
		<div className="relative -mb-24 overflow-hidden">
			<FigureBlurredBg className="top-0 -bottom-10 left-0 right-0 -mt10 md:-mt-64 lg:-mt-32 -mb-32" />
			<div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
					Ask EdgeIn
				</h1>
				<div className="mt-16 relative">
					<FigurePerspectiveGrid className="block absolute z-0 w-full scale-[2.5] bottom-0 opacity-30 text-dark-500" />
					<div className="absolute -top-8 left-0 right-0 aspect-video w-10/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>
					<div className="absolute -top-4 left-0 right-0 aspect-video w-11/12 mx-auto rounded-2xl bg-gradient-to-tr from-white/80 to-white/20 border-2 border-white/60 opacity-80 backdrop-blur-3xl"></div>

					<div className="rounded-2xl bg-white p-6 relative z-10">
						<form
							className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
							onSubmit={onSubmit}
						>
							<div className="group mb-2 sm:col-span-2">
								<InputText
									label="Question"
									type="text"
									name="name"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="e.g. How many companies are tagged NFT"
									required
								/>
							</div>
							<div className="text-right sm:col-span-2">
								<ElemButton btn="primary" loading={loading}>
									Ask
								</ElemButton>
							</div>
							<div className="group mb-2 sm:col-span-2">{queryRes}</div>
							{queryRes && (
								<div className="group mb-2 sm:col-span-2">
									<div onClick={() => setEnableExpand(true)}>
										<span className="leading-tight text-primary-500 hover:border-b hover:border-primary-500">
											Details
										</span>
										<IconChevronDownMini className="inline h-5 aspect-square text-primary-500" />
									</div>
									{enableExpand && (
										<div>
											<pre style={{ whiteSpace: "break-spaces" }}>
												{JSON.stringify(queryResJson, null, 2)}
											</pre>
										</div>
									)}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			metaTitle: "Ask EdgeIn - EdgeIn.io",
		},
	};
};

export default AskEdgein;
