"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import SpotifyTopArtistsGridElement from '@/components/Spotify/TopArtists'
import SpotifyTopTracksGridElement from '@/components/Spotify/TopTracks'



const getSpotifyTimePeriod = (tp: string) => {
    switch (tp) {
        case "short_term":
            return "Short (4w)"
        case "medium_term":
            return "Medium (6m)"
        case "long_term":
            return "All time"
        default:
            return "Unknown"
    }
}

const formatTopType = (tt: string) => {
    let tta = tt.split("")
    tta[0] = tta[0].toUpperCase()
    return tta.join("")
}

export default async function ShowTop({ params }: { params: { toptype: string, timeperiod: string } }) {
    const cookieStore = cookies()

    const streamingService = cookieStore.get('lstats-streaming-service')
    let accessToken: string | undefined
    /* let refreshToken: string | undefined
    let tokenExpiry: number | undefined */

    if (!streamingService){
        redirect('/')
    }

    let data: any

    if (streamingService.value === 'spotify'){
        //const now = new Date()
        accessToken = cookieStore.get('lstats-spotify-token')?.value
        //tokenExpiry = parseInt(cookieStore.get('lstats-spotify-expires-date')?.value as string)

        if (!accessToken){
            redirect('/')
        }

        const res = await fetch(`https://api.spotify.com/v1/me/top/${params.toptype}?limit=10&offset=0&time_range=${params.timeperiod}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        const jsonData = await res.json()

        if ((res.status === 401) && (jsonData.error.message === "The access token expired")){
            redirect('/')
        }

        data = jsonData.items
    }
    else {
        redirect('/')
    }
    
    return (
        <div className="">
            <h3 className="text-center text-lg tracking-tight text-neutral md:text-2xl mt-2">Type: {formatTopType(params.toptype)}</h3>
            <h3 className="text-center text-lg tracking-tight text-neutral md:text-2xl mt-2">Period: {getSpotifyTimePeriod(params.timeperiod)}</h3>
            {(params.toptype === "tracks") && <SpotifyTopTracksGridElement tracks={data} />}
            {(params.toptype === "artists") && <SpotifyTopArtistsGridElement artist={data} />}
        </div>
    )
}
