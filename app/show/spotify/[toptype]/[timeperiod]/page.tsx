"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import SpotifyTopArtistsGridElement from '@/components/Spotify/TopArtists'
import SpotifyTopTracksGridElement from '@/components/Spotify/TopTracks'

import type { Artist } from '@/types/ShowTop'
import SpotifyTopGenresGridElement from '@/components/Spotify/TopGenres'

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
    let genres: { genre: string, artist: string }[] = []
    let genresRanking: {genre: string, count: number, artists: string[]}[] = []

    if (streamingService.value === 'spotify'){
        //const now = new Date()
        accessToken = cookieStore.get('lstats-spotify-token')?.value
        //tokenExpiry = parseInt(cookieStore.get('lstats-spotify-expires-date')?.value as string)

        if (!accessToken){
            redirect('/')
        }

        let res

        if (params.toptype === "genres"){
            
            res = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=${params.timeperiod}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            
            
        }
        else {
            res = await fetch(`https://api.spotify.com/v1/me/top/${params.toptype}?limit=10&offset=0&time_range=${params.timeperiod}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        }

        const jsonData = await res.json()

        if ((res.status === 401) && (jsonData.error.message === "The access token expired")){
            redirect('/')
        }

        data = jsonData.items

        if (params.toptype === "genres"){
            data.forEach((ea: Artist) => {
                ea.genres.forEach(genre => {
                    genres.push({ genre: genre, artist: ea.name})
                })
            })

            let genreCountObject = {}

            /* genres.forEach(x => {
                (genreCountObject as any)[x] = (((genreCountObject as any)[x] || 0) + 1)
            })
            genresRanking = Object.entries(genreCountObject).map(([genre, count]) => ({ genre, count })) as any

            genresRanking.sort((a, b) => b.count - a.count)

            console.log(genresRanking) */

            genres.forEach(x => {
                const existing = genresRanking.find(item => item.genre === x.genre)

                if (existing){
                    existing.count += 1
                    existing.artists.push(x.artist)
                }
                else {
                    genresRanking.push({ genre: x.genre, count: 1, artists: [x.artist] })
                }
            })
            genresRanking.sort((a, b) => b.count - a.count)
            console.log(genresRanking)
        }
    }
    else {
        redirect('/')
    }
    
    return (
        <div>
            <h3 className="text-center text-lg tracking-tight text-neutral md:text-2xl mt-2">Type: {formatTopType(params.toptype)}</h3>
            <h3 className="text-center text-lg tracking-tight text-neutral md:text-2xl mt-2">Period: {getSpotifyTimePeriod(params.timeperiod)}</h3>
            {(params.toptype === "tracks") && <SpotifyTopTracksGridElement tracks={data} />}
            {(params.toptype === "artists") && <SpotifyTopArtistsGridElement artist={data} />}
            {(params.toptype === "genres") && <SpotifyTopGenresGridElement genresRanking={genresRanking} />}
        </div>
    )
}
