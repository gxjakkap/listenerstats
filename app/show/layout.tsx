"use server"

import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link';

export default async function ShowLayout({
    children,
  }: {
    children: React.ReactNode
}) {
    
    const cookieStore = cookies()

    const streamingService = cookieStore.get('lstats-streaming-service')
    let accessToken: string | undefined
    let refreshToken: string | undefined
    let tokenExpiry: number | undefined

    let data: any

    if (!streamingService){
        redirect('/')
    }

    if (streamingService.value === 'spotify'){
        const now = new Date()
        accessToken = cookieStore.get('lstats-spotify-token')?.value
        tokenExpiry = parseInt(cookieStore.get('lstats-spotify-expires-date')?.value as string)

        const nowEpoch = now.getTime()

        console.log(nowEpoch)
        console.log(tokenExpiry)

       /*  if (nowEpoch >= tokenExpiry){
            //TODO: refresh session
            redirect('/')
        } */
        let ures: any
        if (!data){
            ures = await fetch('https://api.spotify.com/v1/me', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            data = await ures.json()
        }

        
        console.log(data)
    }
    else {
        redirect('/')
    }
    
    return (
        <main className="flex w-full flex-col bg-slate-100">
            <div className="mx-auto w-full max-w-screen-lg py-12 xl:max-w-screen-xl">
                <div className="text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-neutral md:text-5xl">
                        {data.display_name}&apos;s Spotify Stats✨
                    </h2>
                </div>
                {children}
            </div>
        </main>
    )
}
