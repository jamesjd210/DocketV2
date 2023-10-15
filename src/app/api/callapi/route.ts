import type { NextApiRequest, NextApiResponse } from 'next'
 
export async function GET(request: NextApiRequest) {
    const response = await fetch("https://tradestie.com/api/v1/apps/reddit")
    console.log(request.url);
    return response;
}