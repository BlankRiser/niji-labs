import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { makeOrderData, Order } from "@/data/make-data"
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"

export const SimpleTable = () => {
	const data = makeOrderData( 10 )

	const columns = useMemo<ColumnDef<Order>[]>( () => [
        {
            id: "orderId",
            header: "Order ID",
            cell: ( { row } ) => row.original.orderId,
        },
        {
            id: "name",
            header: "Name",
            cell: ( { row } ) => row.original.name,
        },
        {
            id: "description",
            header: "Description",
            cell: ( { row } ) => row.original.description,
        },
        {
            id: "createdAt",
            header: "Created At",
            cell: ( { row } ) => row.original.createdAt.toDateString(),
        },
        {
            id: "url",
            header: "URL",
            cell: ( { row } ) => row.original.url,
        },
        {
            id: "quantity",
            header: "Quantity",
            cell: ( { row } ) => row.original.quantity,
        },
        {
            id: "status",
            header: "Status",
            cell: ( { row } ) => row.original.status,
        },
        {
            id: "price",
            header: "Price",
            cell: ( { row } ) => row.original.price,
        }
    ], [] )

	const table = useReactTable( {
		data,
		columns,
		enableRowSelection: false,
        manualPagination: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: false,
	} )
	return (
		<div className="relative">
			<Table className="overflow-x-auto border">
				<TableHeader>
					{table.getHeaderGroups().map( ( headerGroup ) => (
						<TableRow key={headerGroup.id} className="sticky inset-x-0 top-0">
							{headerGroup.headers.map( ( header ) => (
								<TableHead key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<span>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</span>
									)}
								</TableHead>
							) )}
						</TableRow>
					) )}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map( ( row ) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map( ( cell ) => (
								<TableCell key={cell.id}>
									{flexRender( cell.column.columnDef.cell, cell.getContext() )}
								</TableCell>
							) )}
						</TableRow>
					) )}
				</TableBody>
			</Table>
		</div>
	)
}
