import { TTable } from "@/types"
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"

export default function Table({data, columns}: TTable) {
    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()})

    return (
        <div className="overflow-x-auto w-full">
            <table className="w3-table-all w3-small w3-hoverable">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => 
                        <tr key={headerGroup.id} className="w3-blue">
                            {headerGroup.headers.map(header => 
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => 
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => 
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
