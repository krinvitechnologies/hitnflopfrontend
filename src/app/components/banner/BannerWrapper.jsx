// import { cookies } from 'next/headers';
// import Banner from './Banner';

// export default function BannerWrapper() {
//   const country = cookies().get('country')?.value || 'Unknown';
//   return <Banner country={country} />;
// }

// src/app/components/banner/BannerWrapper.jsx
import { cookies } from 'next/headers';
import Banner from './Banner';

export default async function BannerWrapper() {
    const cookieStore = cookies(); // dynamic server usage
    const country = cookieStore.get('country')?.value || 'Unknown';

    return <Banner country={country} />;
}


