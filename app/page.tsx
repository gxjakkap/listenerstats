import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="hero bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] min-h-screen lg:min-h-[95vh]">
        <div className="hero-content flex-col gap-x-28 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">ListenerStats🎵</h1>
            <p className="py-6">Your music obsession, visualized.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h3 className="text-3xl text-center">Login</h3>
              <Link href="/spotify/login"><button className="btn btn-block bg-[#1DB954] text-black mt-2">Login with Spotify</button></Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
