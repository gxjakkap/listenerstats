import * as crypto from 'crypto'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

let callbackUrl = "https://lstats.guntxjakka.me/spotify/callback"

if (process.env.NODE_ENV === "development"){
    callbackUrl = "http://localhost:3000/spotify/callback"
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const cookieStore = cookies()

    if (state === null){
        redirect('/err?type=state_missmatch')
    } 
    else {
        const body = {
            "code": code as string,
            "redirect_uri": callbackUrl,
            "grant_type": "authorization_code"
        }

        const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')

        const res = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basic}`
            }
        })
        const data = res.data
        const now = new Date()
        console.log(data)
        cookieStore.set('lstats-streaming-service', 'spotify')
        cookieStore.set('lstats-spotify-token', data.access_token)
        cookieStore.set('lstats-spotify-refresh-token', data.refresh_token)
        cookieStore.set('lstats-spotify-expires-date', (now.getTime() + data.expires_in).toString())
        
        redirect('/show')
    }
}