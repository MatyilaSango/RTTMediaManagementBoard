"use client"
import Loading from "@/Components/Loading"
import Table from "@/Components/Table"
import { TColumn, TGenericObject, TState } from "@/types"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import Image from 'next/image'
import addIcon from "@/images/add.svg"
import { CellContext } from "@tanstack/react-table"
import EditEntity from "@/Components/EditEntity"
axios.defaults.withCredentials = true

export default function Subscriptions() {
  const [appState, setAppState] = useState<TState>()
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [columns, setColumns] = useState<TColumn[]>([])
  const [addNew, setAddNew] = useState<boolean>(false)
  const [rowToUpdate, setRowToUpdate] = useState<TGenericObject>({})

  useEffect(() => {
    document.getElementById("header")?.classList.remove("loader")
    const state = JSON.parse(sessionStorage.getItem("appState") as string)
    if (!state) return
    setAppState(prev => prev = state)

    const abortController = new AbortController()
    const signal = abortController.signal
    axios.get("https://rrt-media-server-api.vercel.app/api/v1/subscriptions", { signal: signal })
      .then(data => data.data)
      .then(data => {
        if (data.ok) setSubscriptions(prev => prev = data.data)
      })
      .catch(error => { })

    return () => {
      abortController.abort()
    }
  }, [])

  const handleTableData = () => {
    if (subscriptions.length === 0 || columns.length > 0) return
    let columnsTmp: TColumn[] = []
    Object.keys(subscriptions[0]).map((key: string) => {
      columnsTmp.push({
        header: key.toUpperCase(),
        accessorKey: key
      })
    })
    setColumns(prev => prev = columnsTmp)
  }
  handleTableData()

  const handleNewSubscriptionForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/subscriptions", formData)).data
    if (response.ok) setSubscriptions(prev => prev = response.data)
  }

  async function handleEdit(editedProperties: TGenericObject): Promise<void> {
    const response = (await axios.put("https://rrt-media-server-api.vercel.app/api/v1/subscription", editedProperties)).data
    if(!response.ok) return
    setSubscriptions(prev => prev = response.data)
    setRowToUpdate(prev => prev = {})
  }

  async function handleDelete(cell: CellContext<unknown, any>): Promise<void> {
    const subscription = cell.row.original as any
    const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/subscription/delete", { Uid: subscription.Uid })).data
    if (response.ok) setSubscriptions(prev => prev = response.data)
  }

  return (
    appState?.userAccount.Username ?
      <div className="w-full grid grid-cols-1 gap-2 relative">
        <div className="w-full bg-slate-100 p-1">
          <div className="p-3 bg-blue-600 flex gap-2 items-center w-fit text-white rounded cursor-pointer hover:shadow-lg" onClick={() => { setAddNew(prev => !prev) }}>
            <Image className="h-6" alt="" src={addIcon} />
            <span className="text-sm">ADD NEW</span>
          </div>
          {addNew ?
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              <div className="w-full">Add new plan feature.</div>
              <form onSubmit={(e) => handleNewSubscriptionForm(e)} className="flex flex-wrap gap-2">
                <input className="p-2 outline-none" type="text" name="Plan" placeholder="Plan" required />
                <input className="p-2 outline-none" type="text" name="UserId" placeholder="UserId" required />
                <input className="p-2 outline-none" type="text" name="Product" placeholder="Product" required />
                <div className="w-full">
                  <input className="p-3 bg-green-700 flex gap-2 items-center w-fit text-white rounded cursor-pointer hover:shadow-lg" type="submit" value="Save" />
                </div>

              </form>
            </div>
            : ""
          }
        </div>
        <Suspense fallback={<Loading />}>
          <Table data={subscriptions} columns={columns} setRowToUpdate={setRowToUpdate} handleDelete={handleDelete}/>
        </Suspense>
        {Object.keys(rowToUpdate).length > 0 ? <EditEntity pageName="subscription" entity={rowToUpdate} handleEdit={handleEdit} HandleCancel={setRowToUpdate}/> : ""}
      </div>
      : ""
  )
}