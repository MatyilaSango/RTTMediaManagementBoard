"use client"
import { TBody, TState } from '@/types'
import Navigation from './Navigation'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Body({children}: TBody) {
  const [appState, setAppState] = useState<TState>()

  useEffect(() => {
    if (typeof window === "undefined") {
      if (location.pathname !== "/") return redirect("/")
      return
    }

    const state: TState = JSON.parse(sessionStorage.getItem("appState") as string)
    if(state) return setAppState(prev => prev = state)
  }, [])

  return (
    <div className="flex  h-full">
        {appState?.userAccount.Username ? <Navigation /> : ""}
        <div className="p-3 w-full overflow-y-scroll scrollbar">{children}</div>
    </div>
  )  
}