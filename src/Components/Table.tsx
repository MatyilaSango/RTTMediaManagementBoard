import { TTable } from "@/types"
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"
import Image from 'next/image'
import editIcon from "@/images/edit.svg"
import deleteIcon from "@/images/delete.svg"

const useCustomReactTable = ({data, columns, handleEdit, handleDelete}: TTable) =>{
    let columnsTmp = [...columns]
    columnsTmp.push({
        header: "Actions",
        cell: (info) => <div className="flex gap-1">
          <Image alt="" src={editIcon} width={20} className="cursor-pointer" onClick={() => { handleEdit(info) }} />
          <Image alt="" src={deleteIcon} width={20} className="cursor-pointer" onClick={() => { handleDelete(info) }} />
        </div>
    })
    return useReactTable({data, columns: columnsTmp, getCoreRowModel: getCoreRowModel()})
}

export default function Table({data, columns, handleEdit, handleDelete}: TTable) {
    const table = useCustomReactTable({data, columns, handleEdit, handleDelete})

    return (
        <div className="overflow-x-auto w-full scrollbar">
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
