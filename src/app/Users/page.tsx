"use client"
import Loading from "@/Components/Loading"
import Table from "@/Components/Table"
import { TColumn, TState, TUserAccount } from "@/types"
import axios from "axios"
import { Suspense, useEffect, useReducer, useState } from "react"
import Image from 'next/image'
import addIcon from "@/images/add.svg"
import { CellContext } from "@tanstack/react-table"
axios.defaults.withCredentials = true

export default function Users() {
  const [appState, setAppState] = useState<TState>()
  const [userAccounts, setUserAccounts] = useState<TUserAccount[]>([])
  const [columns, setColumns] = useState<TColumn[]>([])
  const [addNew, setAddNew] = useState<boolean>(false)
  const [forceUpdateState, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("appState") as string)
    if (!state) return
    setAppState(prev => prev = state)
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    axios.get("https://rrt-media-server-api.vercel.app/api/v1/users", { signal: signal })
      .then(data => data.data)
      .then(data => {
        if (data.ok) setUserAccounts(prev => prev = data.data)
      })
      .catch(error => { })

    return () => {
      abortController.abort()
    }
  }, [forceUpdateState])

  const handleTableData = () => {
    if (userAccounts.length === 0 || columns.length > 0) return
    let columnsTmp: TColumn[] = []
    Object.keys(userAccounts[0]).map((key: string) => {
      columnsTmp.push({
        header: key.toUpperCase(),
        accessorKey: key
      })
    })
    setColumns(prev => prev = columnsTmp)
  }
  handleTableData()

  const handleNewUserForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/users/post-new-user", formData)).data
    if (response.ok) forceUpdate()
  }

  const handleEdit = (cell: CellContext<unknown, any>) => {
    throw new Error('Function not implemented.')
  }

  const handleDelete = async (cell: CellContext<unknown, any>) => {
    const user = cell.row.original as TUserAccount
    const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/user/delete", { Uid: user.Uid })).data
    if (response.ok) setUserAccounts(prev => prev = response.data)
  }

  return (
    appState?.userAccount.Username ?
      <div className="max-w-full p-2 grid grid-cols-1 gap-2">
        <div className="w-full bg-slate-100 p-1">
          <div className="p-3 bg-blue-600 flex gap-2 items-center w-fit text-white rounded cursor-pointer hover:shadow-lg" onClick={() => { setAddNew(prev => !prev) }}>
            <Image className="h-6" alt="" src={addIcon} />
            <span className="text-sm">ADD NEW</span>
          </div>
          {addNew ?
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              <div className="w-full">Add new plan feature.</div>
              <form onSubmit={(e) => handleNewUserForm(e)} className="flex flex-wrap gap-2">
                <input className="p-2 outline-none" type="text" name="FirstName" placeholder="First Name" required />
                <input className="p-2 outline-none" type="text" name="LastName" placeholder="Last Name" required />
                <input className="p-2 outline-none" type="text" name="Email" placeholder="Email" required />
                <input className="p-2 outline-none" type="text" name="Username" placeholder="Username" required />
                <input className="p-2 outline-none" type="password" name="Password" placeholder="Password" required />
                <div className="w-full">
                  <input className="p-3 bg-green-700 flex gap-2 items-center w-fit text-white rounded cursor-pointer hover:shadow-lg" type="submit" value="Save" />
                </div>
              </form>
            </div>
            : ""
          }
        </div>
        <Suspense fallback={<Loading />}>
          <Table data={userAccounts} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
        </Suspense>
      </div>
      : ""
  )
}