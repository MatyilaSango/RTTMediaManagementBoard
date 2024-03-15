"use client"
import { TState } from "@/types"
import { useEffect, useState } from "react"

export default function Subscriptions() {
  const [appState, setAppState] = useState<TState>()

  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("appState") as string)
    if (!state) return
    setAppState(prev => prev = state)
  }, [])

  return (
    <div className="w-full">

    </div>
  )
}