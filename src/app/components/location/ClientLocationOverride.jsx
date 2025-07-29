'use client';

import { useEffect, useState } from 'react';

export default function ClientLocationOverride() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();

      const newCountry = data.address.country;
      setCountry(newCountry);
    });
  }, []);

  if (!country) return null;

  return (
    <p className="text-sm mt-4 text-gray-500">
      Based on GPS, you're in <strong>{country}</strong>
    </p>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';

// export default function ClientLocationOverride() {
//   const [country, setCountry] = useState<string | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) return;

//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const lat = pos.coords.latitude;
//       const lon = pos.coords.longitude;

//       const res = await fetch(https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon});
//       const data = await res.json();

//       const newCountry = data.address.country;
//       setCountry(newCountry);
//     });
//   }, []);

//   if (!country) return null;

//   return (
//     <p className="text-sm mt-4 text-gray-500">
//       Based on GPS, you're in <strong>{country}</strong>
//     </p>
//   );
// }