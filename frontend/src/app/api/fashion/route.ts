import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parse the request body as JSON
    const bodyData = await req.json()

    // Tạo một promise để trì hoãn trong 10 giây
    await new Promise((resolve) => setTimeout(resolve, 10000))

    // Dữ liệu phản hồi
    const responseData = {
      status: 'processing',
      fetch_result: 'http://localhost:3000/api/fetch/123',
    }

    // Return the prediction data as a response
    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    // Handle unexpected errors gracefully
    console.error('Error processing the request:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 },
    )
  }
}
