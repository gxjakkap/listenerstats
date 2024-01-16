import Image from 'next/image'
import Link from 'next/link'

const SpotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
  </svg>
)


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
              <Link href="/spotify/login"><button className="btn btn-block bg-[#1DB954] text-black mt-2"><SpotifyIcon /> Login with Spotify</button></Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
