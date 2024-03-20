"use client"
import Loading from "@/Components/Loading"
import Table from "@/Components/Table"
import { TColumn, TGenericObject, TState } from "@/types"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import { CellContext } from "@tanstack/react-table"
axios.defaults.withCredentials = true

export default function Sales() {
  const [appState, setAppState] = useState<TState>()
  const [sales, setSales] = useState<any[]>([])
  const [columns, setColumns] = useState<TColumn[]>([])
  const [rowToUpdate, setRowToUpdate] = useState<TGenericObject>({})

  useEffect(() => {
    document.getElementById("header")?.classList.remove("loader")
    const state = JSON.parse(sessionStorage.getItem("appState") as string)
    if (!state) return
    setAppState(prev => prev = state)

    const abortController = new AbortController()
    const signal = abortController.signal
    axios.get("https://rrt-media-server-api.vercel.app/api/v1/sales", { signal: signal})
      .then(data => data.data)
      .then(data => {
        if (data.ok) setSales(prev => prev = data.data)
      })
      .catch(error => { })

    return () => {
      abortController.abort()
    }
  }, [])

  const handleTableData = () => {
    if (sales.length === 0 || columns.length > 0) return
    let columnsTmp: TColumn[] = []
    Object.keys(sales[0]).map((key: string) => {
      columnsTmp.push({
        header: key.toUpperCase(),
        accessorKey: key
      })
    })
    setColumns(prev => prev = columnsTmp)
  }
  handleTableData()

  function handleEdit(editedProperties: TGenericObject): void {
    // throw new Error("Function not implemented.")
  }

  function handleDelete(cell: CellContext<unknown, any>): void {
    // throw new Error("Function not implemented.")
  }

  return (
    appState?.userAccount.Username ?
      <div className="w-full p-2 grid grid-cols-1 gap-2 relative">
        <Suspense fallback={<Loading />}>
          <Table data={sales} columns={columns} setRowToUpdate={setRowToUpdate} handleDelete={handleDelete}/>
        </Suspense>
      </div>
      : ""
  )
}