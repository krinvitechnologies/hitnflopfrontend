// // navigate user according to token store in cookies
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export default function middleware(req: NextRequest) {
//   const authToken = req.cookies.get("th_token")?.value;
//   const loggedInUserNotAccessPaths= req.nextUrl.pathname==="/login";

//   if (loggedInUserNotAccessPaths){
//     if(authToken){
//       return NextResponse.redirect(new URL('/dashboard', req.url))
//     }
//   }else{
//     if(!authToken){
//       return NextResponse.redirect(new URL('/login', req.url))
//     }
//   }
// } 

// export const config = {
//   matcher: ['/', '/login', '/dashboard', '/profile', '/reservations', '/reports', '/guest-list', '/floor-plan']
// }











// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export default function middleware(req: NextRequest) {
//   const authToken = req.cookies.get("th_token")?.value;
//   const restaurantId = localStorage.getItem('restaurantId');
//   // const restaurantId = req.cookies.get('restaurantId')?.value;

//   const loggedInUserNotAccessPaths= req.nextUrl.pathname==="/login";

//   if (loggedInUserNotAccessPaths){
//     if(authToken && restaurantId){
//       return NextResponse.redirect(new URL('/dashboard', req.url))
//     }
//   }else{
//     if(!authToken || !restaurantId){
//       return NextResponse.redirect(new URL('/login', req.url))
//     }
//   }
// } 

// export const config = {
//   matcher: ['/', '/login', '/dashboard', '/profile', '/reservations', '/reports', '/guest-list', '/floor-plan']
// }
