import * as crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from 'next/navigation'


let callbackUrl = "https://lstats.guntxjakka.me/spotify/callback"

if (process.env.NODE_ENV === "development"){
    callbackUrl = "http://localhost:3000/spotify/callback"
}

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const state = crypto.randomBytes(8).toString('hex')
    const scope = "user-top-read user-read-private user-read-email"

    const ep = new URL('https://accounts.spotify.com/authorize')

    ep.searchParams.append('response_type', 'code')
    ep.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID as string)
    ep.searchParams.append('scope', scope)
    ep.searchParams.append('redirect_uri', callbackUrl)
    ep.searchParams.append('state', state)

    
    redirect(ep.toString())
}