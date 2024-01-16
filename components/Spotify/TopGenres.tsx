import Link from "next/link"

interface Genre {
    genre: string,
    count: number
}

const SpotifyTopGenresGridElement = ({ genresRanking } : {genresRanking: Genre[]}) => {
    return (
        <div className="grid justify-center gap-6 mt-10 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {genresRanking.map((data, i) => (
                <Link key={i} href={`https://google.com/search?q=${data.genre}%20genre`} target="_blank" rel="noreferer">
                    <div className="card bg-primary z-0 w-96 h-96 shadow-xl image-full">
                        <div className="card-body">
                            <h2 className="card-title text-3xl">#{(i + 1).toString()}</h2>
                            <div className="flex-shrink">
                                <p className="mb-0 font-bold text-lg">{data.genre}</p>
                                <p className="text-md">Appeared <span className="font-bold">{data.count}</span> time{(data.count > 1) ? "s" : ""} from your top 50 artists</p>
                                { /* TODO: add artists example */}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
    </div>
    )
}

export default SpotifyTopGenresGridElement
