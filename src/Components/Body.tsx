"use client"
import { TBody } from '@/types'
import Navigation from './Navigation'

export default function Body({children}: TBody) {
  return (
    <div className="flex  h-full">
        <Navigation />
        <div className="p-1 w-full">{children}</div>
    </div>
  )
    
}
