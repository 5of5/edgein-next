import React from "react";
import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { TableRecentCompanies } from "@/components/Dashboard/TableRecentCompanies";

type Props = {};

const Dashboard: NextPage<Props> = ({}) => {
	return (
		<div className="max-w-6xl mx-auto h-full relative px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
			<DashboardLayout>
				<TableRecentCompanies heading="Recently Added Projects" />
			</DashboardLayout>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			metaTitle: "Recently Added Companies- EdgeIn.io",
		},
	};
};

export default Dashboard;
