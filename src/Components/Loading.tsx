import React from 'react'
import loadingIcon from "@/images/loading.svg"
import Image from 'next/image'

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
        <Image className="loading" alt='' src={loadingIcon} />
    </div>
  )
}