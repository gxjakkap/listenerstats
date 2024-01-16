import Link from "next/link"
import type { Artist } from "@/types/ShowTop"

const getMaxSizeImage = (imageArray: {
    url: string;
    height: number;
    width: number;
}[]) => {
    imageArray.sort((a, b) => b.width - a.width)
    return imageArray[0].url
}

const SpotifyTopArtistsGridElement = ({ artist } : {artist: Artist[]}) => {
    const getGenreString = (genres: string[]) => {
        if (genres.length === 0){
            return null
        }
        else if (genres.length === 1){
            return genres[0]
        }
        let genresString: string = ""
        genres.forEach((x, i) => {
            if (i === 0){
                genresString = x
            }
            else {
                genresString += `, ${x}`
            }
        })
        return genresString
    }
    return (
        <div className="grid justify-center gap-6 mt-10 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {artist.map((data, i) => (
                <Link key={data.uri} href={data.external_urls.spotify || ""}>
                    <div className="card z-0 w-96 h-96 bg-base-100 shadow-xl image-full">
                        <figure className="object-fill"><img className="object-fill w-full" src={getMaxSizeImage(data.images)} alt={`${data.name}`} /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-3xl">#{(i + 1).toString()}</h2>
                            <div className="flex-shrink">
                                <p className="mb-0 font-bold text-lg">{data.name}</p>
                                <p className="mb-0">Genre: {getGenreString(data.genres)}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                
            ))}
    </div>
    )
}

export default SpotifyTopArtistsGridElement
