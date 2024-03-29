"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import userIcon from "@/images/user.svg"
import axios from 'axios'
import { redirect } from 'next/navigation'
import { TState } from '@/types'
axios.defaults.withCredentials = true

export default function Header() {
  const [appState, setAppState] = useState<TState>()

  useEffect(() => {
    if (typeof window === "undefined") {
      if (location.pathname !== "/") return redirect("/")
      return
    }
    
    const abortController = new AbortController()
    const signal = abortController.signal
    axios.get("https://rrt-media-server-api.vercel.app/api/v1/user/refresh", { signal: signal })
      .then(promise => promise.data)
      .then(response => {
        if (response.ok) {
          setAppState(prev => prev = { userAccount: response.data })
          sessionStorage.setItem("appState", JSON.stringify({ userAccount: response.data }))
          if (location.pathname === "/") return location.href = "/Dashboard"
          return
        }
      })
      .catch((error) => {
        if(error.code === "ERR_CANCELED") return
        sessionStorage.removeItem("appState")
        if (location.pathname !== "/") location.href = "/"
      })
    return () => {
      abortController.abort()
    }
  }, [])

  const handleLogOut = async () => {
    document.getElementById("header")?.classList.add("loader")
    axios.delete("https://rrt-media-server-api.vercel.app/api/tokens/clear")
      .then(promise => promise.data)
      .then(deleteTokenResponse => {
        if (deleteTokenResponse.ok) {
          sessionStorage.removeItem("appState")
          setAppState(prev => prev = undefined)
          location.href = "/"
        }
      })
      .catch(eror => { })
  }
  return (
    <div id="header" className="h-20 flex items-center justify-between relative pl-4 pr-4 text-white bg-blue-900">
      <div className="text-3xl font-bold">Dashboard</div>
      <div className="flex items-center">
        {appState?.userAccount?.Username ?
          <div className="mr-3">
            <div>
              <span>{appState?.userAccount?.Username}</span>
            </div>
            <div onClick={() => { handleLogOut() }}>
              <span className="flex justify-center text-xs cursor-pointer hover:text-black">Logout</span>
            </div>
          </div>
          : ""
        }
        <Image alt='' src={userIcon} />
      </div>
    </div>
  )
}