import Link from "next/link"

import type { Track, ArtistForTrack } from "@/types/ShowTop"

const getMaxSizeImage = (imageArray: {
    url: string;
    height: number;
    width: number;
}[]) => {
    imageArray.sort((a, b) => b.width - a.width)
    return imageArray[0].url
}

const SpotifyTopTracksGridElement = ({ tracks } : {tracks: Track[]}) => {
    const getArtistString = (artists: ArtistForTrack[]) => {
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

    return (
        <div className="grid justify-center gap-6 mt-10 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {tracks.map((data, i) => (
                <Link key={data.uri} href={data.external_urls.spotify || ""}>
                    <div className="card z-0 w-80 h-80 md:w-96 md:h-96 mx-auto bg-base-100 shadow-xl image-full">
                        <figure><img src={getMaxSizeImage(data.album.images)} alt={`${data.album.name}'s album cover`} /></figure>
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

export default SpotifyTopTracksGridElement