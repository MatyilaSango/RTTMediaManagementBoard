"use client"
import SummaryCard from "@/Components/SummaryCard"
import { TState, TSummaryCardData } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import salesIcon from "@/images/sales.svg"
import usersIcon from "@/images/users.svg"
import subscriptionIcon from "@/images/subscription.svg"
import plansIcon from "@/images/plans.svg"

const defaultSummaryCardsData: TSummaryCardData = {
    Sales: undefined, 
    Subscriptions: undefined,
    Users: undefined,
    Plans: undefined
}

export default function Dashboard() {
    const [appState, setAppState] = useState<TState>()
    const [summaryCardsData, setSummaryCardsData] = useState<TSummaryCardData>(defaultSummaryCardsData)

    useEffect(() => {
        document.getElementById("header")?.classList.remove("loader")
        const state = JSON.parse(sessionStorage.getItem("appState") as string)
        if (!state) return
        setAppState(prev => prev = state)
    }, [])

    useEffect(() => {
        if (summaryCardsData.Subscriptions) return
        const abortController = new AbortController()
        const signal = abortController.signal
        axios.get("https://rrt-media-server-api.vercel.app/api/v1/subscriptions", { signal: signal })
            .then(data => data.data)
            .then(data => {
                if (data.ok) {
                    const amount = data.data.length
                    const description = "Subscriptions"
                    const icon = subscriptionIcon
                    const bgColor = { from: "purple", to: "purple" }
                    setSummaryCardsData(prev => prev = { ...prev, Subscriptions: { amount, description, icon, bgColor } })
                }
            })
            .catch(error => { })

        return () => {
            abortController.abort()
        }
    }, [summaryCardsData])

    useEffect(() => {
        if (summaryCardsData.Users) return
        const abortController = new AbortController()
        const signal = abortController.signal
        axios.get("https://rrt-media-server-api.vercel.app/api/v1/users", { signal: signal })
            .then(data => data.data)
            .then(data => {
                if (data.ok) if (data.ok) {
                    const amount = data.data.length
                    const description = "Users"
                    const icon = usersIcon
                    const bgColor = { from: "orange", to: "orange" }
                    setSummaryCardsData(prev => prev = { ...prev, Users: { amount, description, icon, bgColor } })
                }
            })
            .catch(error => { })

        return () => {
            abortController.abort()
        }
    }, [summaryCardsData])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        axios.get("https://rrt-media-server-api.vercel.app/api/v1/plans/all", { signal: signal })
            .then(data => data.data)
            .then(data => {
                if (data.ok){
                    const amount = data.data.length
                    const description = "Plans"
                    const icon = plansIcon
                    const bgColor = { from: "pink", to: "pink" }
                    setSummaryCardsData(prev => prev = { ...prev, Plans: { amount, description, icon, bgColor } })
                }
            })
            .catch(error => { })

        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <div className="w-full">
            <div className="flex flex-row flex-wrap justify-center gap-5">
                {Object.entries(summaryCardsData).map((data, indx) =>
                    data[1] && <SummaryCard key={data[0]} bgColor={data[1]?.bgColor} icon={data[1].icon} amount={data[1].amount} description={data[1].description} />
                )}
            </div>
        </div>
    )
}