import React from "react";
import type { NextPage, GetStaticProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { TableRecentCompanies } from "@/components/Dashboard/TableRecentCompanies";

type Props = {};

const Dashboard: NextPage<Props> = ({}) => {
	return (
		<DashboardLayout>
			<TableRecentCompanies heading="Recently Added Projects" />
		</DashboardLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			metaTitle: "Recently Added Companies- EdgeIn.io",
		},
	};
};

export default Dashboard;
