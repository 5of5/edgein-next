const TableBody = ({ tableData, columns }: any) => {
	return (
		<tbody>
			{tableData.map((item: any) => {
				return (
					<tr key={item.id}>
						{columns.map(({ accessor }: any) => {
							const tData = item[accessor] ? item[accessor] : "—X—";
							return <td key={accessor}>{tData}</td>;
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;
