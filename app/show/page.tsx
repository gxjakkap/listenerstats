"use client"

import Link from "next/link"
import { ChangeEvent, useState } from "react"

export default function ShowHome() {
    const [timePeriod, setTimePeriod] = useState<"short_term" | "medium_term" | "long_term">("short_term")
    const [topType, setType] = useState<"tracks" | "artists">("tracks")
    
    return (
        <div className="flex flex-col w-full md:flex-row gap-y-2 md:gap-x-1 min-h-screen lg:min-h-[95vh]">
            <div className="mx-auto w-3/4 justify-center">
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Select time period</span>
                    </div>
                    <select className="select select-bordered" value={timePeriod} onChange={(event: ChangeEvent<HTMLSelectElement>) => {setTimePeriod(event.target.value as any)}}>
                        <option value={"short_term"}>Short (4w)</option>
                        <option value={"medium_term"}>Medium (6m)</option>
                        <option value={"long_term"}>All time</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Type</span>
                    </div>
                    <select className="select select-bordered" value={topType} onChange={(event: ChangeEvent<HTMLSelectElement>) => {setType(event.target.value as any)}}>
                        <option value={"tracks"}>Tracks</option>
                        <option value={"artists"}>Artists</option>
                    </select>
                </label>
                <Link href={`/show/${topType}/${timePeriod}`}><button className="btn btn-primary mt-5">Get Data</button></Link>
            </div>
        </div>
    )
}
