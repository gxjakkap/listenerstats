"use server"

import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link';

interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: Artist[];
}
  
interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
  
interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
  

const TopTracksGridElement = ({ tracks } : {tracks: Track[]}) => {
    const getMaxSize = (imageArray: {
        url: string;
        height: number;
        width: number;
    }[]) => {
        imageArray.sort((a, b) => b.width - a.width)
        console.log(imageArray)
        return imageArray[0].url
    }

    const getArtistString = (artists: Artist[]) => {
        /* return artists.reduce((acc, x) => acc += x.name, "") */
        if (artists.length === 1){
            return artists[0].name
        }
        let artistsString: string = ""
        artists.forEach((x, i) => {
            if (i === 0){
                artistsString = x.name
            }
            else {
                artistsString += `, ${x.name}`
            }
        })
        return artistsString
    }

    console.log(tracks)

    return (
        <div className="grid justify-center gap-6 mt-10 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {tracks.map((data, i) => (
                <Link key={data.uri} href={data.external_urls.spotify || ""}>
                    <div className="card z-0 w-96 bg-base-100 shadow-xl image-full">
                        <figure><img src={getMaxSize(data.album.images)} alt={`${data.album.name}'s album cover`} /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-3xl">#{(i + 1).toString()}</h2>
                            <p>{getArtistString(data.artists)} - {data.name}</p>
                        </div>
                    </div>
                </Link>
                
            ))}
    </div>
    )
}

export default async function ShowData({ params }: { params: { toptype: string, timeperiod: string } }) {
    const cookieStore = cookies()

    const streamingService = cookieStore.get('lstats-streaming-service')
    let accessToken: string | undefined
    let refreshToken: string | undefined
    let tokenExpiry: number | undefined

    if (!streamingService){
        redirect('/')
    }

    let data: any

    if (streamingService.value === 'spotify'){
        const now = new Date()
        accessToken = cookieStore.get('lstats-spotify-token')?.value
        tokenExpiry = parseInt(cookieStore.get('lstats-spotify-expires-date')?.value as string)

        if (now.getTime() >= tokenExpiry){
            //TODO: refresh session
            redirect('/')
        }

        const res = await fetch(`https://api.spotify.com/v1/me/top/${params.toptype}?limit=10&offset=0&time_range=${params.timeperiod}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        const ures = await fetch('https://api.spotify.com/v1/me', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        data = (await res.json()).items
    }
    else {
        redirect('/')
    }
    
    return (
        <div className="">
            <h3 className="text-center text-xl tracking-tight text-neutral md:text-2xl mt-2">Period: {params.timeperiod}</h3>
            <TopTracksGridElement tracks={data} />
        </div>
    )
}
