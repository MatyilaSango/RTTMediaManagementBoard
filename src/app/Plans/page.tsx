"use client"
import Table from '@/Components/Table'
import { TColumn, TState } from '@/types'
import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'
import addIcon from "@/images/add.svg"
import Image from 'next/image'
import Loading from '@/Components/Loading'

export default function Page() {
    const [plans, setPlans] = useState<any[]>([])
    const [columns, setColumns] = useState<TColumn[]>([])
    const [addNew, setAddNew] = useState<boolean>(false)
    const [appState, setAppState] = useState<TState>()

    useEffect(() => {
      const state = JSON.parse(sessionStorage.getItem("appState") as string)
      if(!state) return
      setAppState(prev => prev = state)
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        axios.get("https://rrt-media-server-api.vercel.app/api/v1/plans/all", { signal: signal })
            .then(data => data.data)
            .then(data => {
                if (data.ok) setPlans(prev => prev = data.data)
            })
            .catch(error => { })

        return () => {
            abortController.abort()
        }
    }, [])

    const handleTableData = () => {
        if (plans.length === 0 || columns.length > 0) return
        let columnsTmp: TColumn[] = []
        Object.keys(plans[0]).map((key: string) => {
            columnsTmp.push({
                header: key.toUpperCase(),
                accessorKey: key
            })
        })
        setColumns(prev => prev = columnsTmp)
    }
    handleTableData()

    const handleNewPlanForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
        const response = (await axios.post("https://rrt-media-server-api.vercel.app/api/v1/plans", formData, {withCredentials: true})).data
        if (response.ok) setPlans(prev => prev = response.data)
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
                        <form onSubmit={(e) => handleNewPlanForm(e)} className="flex flex-wrap gap-2">
                            <input className="p-2 outline-none" type="text" name="Feature" placeholder="Feature" required />
                            <input className="p-2 outline-none" type="text" name="Free" placeholder="Free" required />
                            <input className="p-2 outline-none" type="text" name="Pro" placeholder="Pro" required />
                            <input className="p-2 outline-none" type="text" name="Premium" placeholder="Premium" required />
                            <div className="w-full">
                                <input className="p-3 bg-green-700 flex gap-2 items-center w-fit text-white rounded cursor-pointer hover:shadow-lg" type="submit" value="Save" />
                            </div>

                        </form>
                    </div>
                    : ""
                }
            </div>
            <Suspense fallback={<Loading />}>
                <Table data={plans} columns={columns} />
            </Suspense>
        </div>
        :""
    )
}