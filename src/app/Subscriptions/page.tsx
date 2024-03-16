"use client"
import Loading from "@/Components/Loading"
import Table from "@/Components/Table"
import { TColumn, TState } from "@/types"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import Image from 'next/image'
import addIcon from "@/images/add.svg"

export default function Subscriptions() {
  const [appState, setAppState] = useState<TState>()
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [columns, setColumns] = useState<TColumn[]>([])
  const [addNew, setAddNew] = useState<boolean>(false)

  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("appState") as string)
    if (!state) return
    setAppState(prev => prev = state)
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    axios.get("https://rrt-media-server-api.vercel.app/api/v1/subscriptions", { signal: signal, withCredentials: true })
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
    const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/subscriptions", formData, {withCredentials: true})).data
    if (response.ok) setSubscriptions(prev => prev = response.data)
  }

  return (
    appState?.userAccount.Username ?
      <div className="w-full p-2 grid grid-cols-1 gap-2">
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
          <Table data={subscriptions} columns={columns} />
        </Suspense>
      </div>
      : ""
  )
}