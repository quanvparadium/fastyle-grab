import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parse the request body as JSON
    const bodyData = await req.json()

    // Tạo một promise để trì hoãn trong 10 giây
    await new Promise((resolve) => setTimeout(resolve, 10000))

    // Dữ liệu phản hồi
    const responseData = {
      status: 'success',
      id: 97871538,
      output: [
        'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/604f0f9f-1442-467d-8c38-a4adf105afc6.png',
      ],
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
