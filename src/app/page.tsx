"use client"
import axios from "axios"
import exitIcon from "@/images/close.svg"
import loadingIcon from "@/images/update.svg"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
axios.defaults.withCredentials = true

export default function Home() {
    const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false)
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    let incorrectRef = useRef(false)

    useEffect(() => {
        if (isSignedIn) location.href = "/Dashboard"
    }, [isSignedIn])

    const handleFormDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isSignInLoading) {
            const inputValues = Array.from(e.currentTarget)
            //@ts-ignore
            const username: string = inputValues[0].value
            //@ts-ignore
            const password: string = inputValues[1].value
            setIsSignInLoading(prev => prev = true)
            incorrectRef.current = false

            const abortController = new AbortController()
            const signal = abortController.signal
            axios.post("https://rrt-media-server-api.vercel.app/api/v1/user/log-in", {
                signal: signal,
                withCredentials: true,
                Username: username,
                Password: password
            })
                .then(promise => promise.data)
                .then(userResponse => {
                    if (!userResponse.ok) {
                        setIsSignInLoading(prev => prev = false)
                        incorrectRef.current = true
                        return
                    }
                    sessionStorage.setItem("appState", JSON.stringify({ userAccount: userResponse.data }))
                    setIsSignedIn(prev => prev = true)
                })
                .catch(error => { })

            return () => {
                abortController.abort()
            }
        }
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="flex justify-center items-center py-5">
                <div className="max-w-lg w-full h-fit rounded-3xl p-5 shadow-md">
                    <div className="h-7 relative flex justify-center items-center">
                        <Link href="/">
                            <Image className="h-3/4 w-auto absolute left-0 top-0 rounded-lg cursor-pointer hover:bg-gray-400 hover:shadow-md" src={exitIcon} alt="" />
                        </Link>
                    </div>
                    <div className="py-7 px-14">
                        <div className="text-xl font-bold flex justify-center">
                            <span>Sign in to RTTMedia Management</span>
                        </div>
                        <form onSubmit={(e) => handleFormDetails(e)} className="flex justify-center flex-row flex-wrap">
                            <input className="h-12 w-11/12 mt-7 px-2 text-sm border-0 border-y border-solid border-black" type="text" required placeholder="Username" name="username" />
                            <input className="h-12 w-11/12 mt-7 px-2 text-sm border-0 border-y border-solid border-black" type="password" required placeholder="Password" name="password" />
                            <div className={"text-red-600 text-xs hidden" + `${incorrectRef.current ? "block" : ""}`}>
                                Incrorrect username or password
                            </div>
                            <button className="h-12 w-11/12 cursor-pointer rounded-lg mt-5 bg-blue-950 text-white flex justify-center items-center" type="submit">
                                {isSignInLoading ? <Image className="loading h-6 w-auto" alt="" src={loadingIcon} /> : "Sign in"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}