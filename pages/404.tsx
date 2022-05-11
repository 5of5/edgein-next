import { ElemButton } from "../components/ElemButton";

export default function Custom404() {
	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gradient-to-tr from-[#1B01FE] via-[#FE33D0] to-[#F8DA4B]">
			<div className="px-40 py-20 bg-white rounded-md shadow-xl">
				<div className="flex flex-col items-center">
					<h1 className="font-bold text-dark-500 text-9xl">404</h1>

					<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
						<span className="text-red-500">Oops!</span> Page not found
					</h6>

					<p className="mb-8 text-center text-gray-500 md:text-lg">
						The page you’re looking for doesn’t exist.
					</p>

					<ElemButton btn="primary" href="/" arrowLeft>
						Back Home
					</ElemButton>
				</div>
			</div>
		</div>
	);
}
