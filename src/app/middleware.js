import { NextResponse } from 'next/server';

export async function middleware(request) {
  const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';

  const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
  const geo = await geoRes.json();

  const country = geo?.country_name || 'Unknown';

  const response = NextResponse.next();
  response.cookies.set('country', country);
  return response;
}


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   // Get IP address from headers (fallback to '0.0.0.0')
//   const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';

//   // Call IP geolocation API
//   const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
//   const geo = await geoRes.json();

//   const country = geo?.country_name || 'Unknown';

//   const response = NextResponse.next();
//   response.cookies.set('country', country);
//   return response;
// }


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const ip = request.headers.get('x-forwarded-for') || request.ip || '0.0.0.0';

//   const geoRes = await fetch(https://ipapi.co/${ip}/json/);
//   const geo = await geoRes.json();

//   const country = geo?.country_name || 'Unknown';

//   const response = NextResponse.next();
//   response.cookies.set('country', country); // Store in cookie for later use
//   return response;
// }