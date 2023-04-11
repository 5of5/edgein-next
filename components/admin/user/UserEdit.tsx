import React from "react";
import {
	SimpleForm,
	TextInput,
	SelectInput,
	Toolbar,
	SaveButton,
	DeleteButton,
	ArrayInput,
	SimpleFormIterator,
	required,
} from "react-admin";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import UserResetPasswordButton from "./UserResetPasswordButton";
import UserResetPasswordTable from "./UserResetPasswordTable";

const UserEditToolbar = () => {
	return (
		<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
			<SaveButton label="Save" />
			<div>
				<UserResetPasswordButton />
				<DeleteButton label="Delete" sx={{ marginLeft: 1 }} />
			</div>
		</Toolbar>
	);
};

export const UserEdit = () => {
	const inputClassName =
		"w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

	const transform = (data: any) => ({
		...data,
		additional_emails:
			data.additional_emails && data.additional_emails.length > 0
				? data.additional_emails.map((item: { email: string }) => item.email)
				: data.additional_emails,
	});

	return (
		<div style={{ paddingBottom: "20px" }}>
			<ElemFormBase
				title={<ElemTitle category="Users" />}
				action="edit"
				transform={transform}
			>
				<SimpleForm toolbar={<UserEditToolbar />}>
					<TextInput className={inputClassName} disabled source="id" />
					<TextInput className={inputClassName} disabled source="email" />
					<TextInput className={inputClassName} source="display_name" />
					<TextInput className={inputClassName} source="person_id" />
					<SelectInput
						className={inputClassName}
						source="role"
						choices={[
							{ id: "admin", name: "Admin" },
							{ id: "user", name: "User" },
							{ id: "cms", name: "CMS" },
							{ id: "cms-readonly", name: "CMS Readonly" },
						]}
						validate={required()}
					/>
					<ArrayInput source="additional_emails">
						<SimpleFormIterator
							disableReordering
							sx={{ margin: 2, paddingTop: 1 }}
						>
							<TextInput className={inputClassName} source="email" />
						</SimpleFormIterator>
					</ArrayInput>
					<SelectInput
						className={inputClassName}
						source="active"
						choices={[
							{ id: true, name: "Active" },
							{ id: false, name: "Inactive" },
						]}
						validate={required()}
					/>
				</SimpleForm>
			</ElemFormBase>
			<UserResetPasswordTable />
		</div>
	);
};
