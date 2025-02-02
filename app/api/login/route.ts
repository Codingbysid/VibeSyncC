import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log("API Request Body:", body); 

  const { emailid, password } = body;

  // Validate the username and password
  if (emailid === 'admin@gmail.com' && password === 'password123') {
    console.log("Login successful");
    return NextResponse.json({ message: 'Login successful' });
  } else {
    console.log("Invalid credentials"); 
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
