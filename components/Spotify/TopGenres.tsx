import Link from "next/link"

interface Genre {
    genre: string,
    count: number,
    artists: string[]
}

const artistStringTruncate = (artists: string[]) => {
    if (artists.length > 10){
        let returnArr = artists.slice(0, 9)
        returnArr.push("etc..")
        return returnArr
    }
    return artists
}

const SpotifyTopGenresGridElement = ({ genresRanking } : {genresRanking: Genre[]}) => {
    return (
        <div className="grid justify-center gap-6 mt-10 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {genresRanking.map((data, i) => (
                <Link key={i} href={`https://google.com/search?q=${data.genre}%20genre`} target="_blank" rel="noreferer">
                    <div className="card bg-primary z-0 w-80 h-80 md:w-96 md:h-96 mx-auto shadow-xl image-full">
                        <div className="card-body">
                            <h2 className="card-title text-3xl">#{(i + 1).toString()}</h2>
                            <div className="flex flex-col flex-shrink gap-y-1">
                                <p className="mb-0 font-bold text-lg">{data.genre}</p>
                                <p className="text-md">Appeared <span className="font-bold">{data.count}</span> time{(data.count > 1) ? "s" : ""} from your top 50 artists</p>
                                <p className="text-md"><span className="font-bold">Artist{(data.artists.length > 1) ? "s" : ""}: </span> {artistStringTruncate(data.artists).join(", ")} </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
    </div>
    )
}

export default SpotifyTopGenresGridElement
