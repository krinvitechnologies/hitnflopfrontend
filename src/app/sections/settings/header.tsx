"use client";

import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// const Header = () => {
const Header = React.memo(() => {
  const pathname = usePathname();

  // Enhanced isActive function to support multiple paths
  const isActive = (paths: string | string[]) => {
    if (Array.isArray(paths)) {
      return paths.includes(pathname);
    }
    return pathname === paths;
  };

  return (
    <div className={`p-2 box-border transition-all duration-300 max-lg:hidden`}>
      <h4 className='text-[#414346] text-2xl font-inter font-bold py-2 box-border'>Settings</h4>
      <nav className="flex w-full h-[42px] text-sm flex-grow border-b-2 border-[#E1E3E6] gap-4">
        <Link href="/settings/company-profile" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive(['/settings/company-profile', '/settings/edit-profile']) ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
          {/* <DashboardIcon fontSize="small" /> */}
          <Image src="/assets/icons/Settings/header/Business.svg" width={24} height={24} priority alt="Business" />
          <span className="ml-2">Company Profile</span>
        </Link>
        <Link href="/settings/branches" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive(['/settings/branches', '/settings/add-branches', '/settings/edit-branches']) ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
          <Image src="/assets/icons/Settings/header/MapPinLine.svg" width={24} height={24} priority alt="Location" />
          <span className="ml-2">Branches</span>
        </Link>
        <Link href="/settings/teams" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/teams') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
          <Image src="/assets/icons/Settings/header/Groups 3.svg" width={24} height={24} priority alt="Group" />
          <span className="ml-2">Teams</span>
        </Link>
        <Link href="/settings/integrations" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/integrations') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
          <Image src="/assets/icons/Settings/header/Plugs.svg" width={24} height={24} priority alt="Plugs" />
          <span className="ml-2">Integrations</span>
        </Link>
        <Link href="/settings/payment-and-subscription" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/payment-and-subscription') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
          <Image src="/assets/icons/Settings/header/Payment.svg" width={24} height={24} priority alt="Card" />
          <span className="ml-2">Payment and Subscription</span>
        </Link>
      </nav>
    </div>
  );
});
// };

// Add displayName to resolve the ESLint error
Header.displayName = "Header";

export default Header;





// "use client";

// import React from "react";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import TableChart from '@mui/icons-material/TableChart';
// import ViewList from '@mui/icons-material/ViewList';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import TableBarIcon from '@mui/icons-material/TableBar';
// import SortIcon from '@mui/icons-material/Sort';
// import Image from 'next/image';

// // const Header = () => {
// const Header = React.memo(() => {
//   const pathname = usePathname();
//   const isActive = (path: string) => pathname === path;

//   return (
//     <div className={`p-2 box-border transition-all duration-300 max-lg:hidden`}>
//       <h4 className='text-[#414346] text-2xl font-inter font-bold py-2 box-border'>Settings</h4>
//       <nav className="flex w-full h-[42px] text-sm flex-grow border-b-2 border-[#E1E3E6] gap-4">
//         <Link href="/settings/company-profile" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/company-profile') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
//           {/* <DashboardIcon fontSize="small" /> */}
//           <Image src="/assets/icons/Settings/header/Business.svg" width={24} height={24} alt="Business" />
//           <span className="ml-2">Company Profile</span>
//         </Link>
//         <Link href="/settings/branches" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/branches') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
//           <Image src="/assets/icons/Settings/header/MapPinLine.svg" width={24} height={24} alt="Location" />
//           <span className="ml-2">Branches</span>
//         </Link>
//         <Link href="/settings/teams" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/teams') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
//           <Image src="/assets/icons/Settings/header/Groups 3.svg" width={24} height={24} alt="Group" />
//           <span className="ml-2">Teams</span>
//         </Link>
//         <Link href="/settings/integrations" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/integrations') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
//           <Image src="/assets/icons/Settings/header/Plugs.svg" width={24} height={24} alt="Plugs" />
//           <span className="ml-2">Integrations</span>
//         </Link>
//         <Link href="/settings/payment-and-subscription" className={`flex items-center p-2 box-border text-sm font-inter font-semibold ${isActive('/settings/payment-and-subscription') ? 'text-[#1F2122] border-b-2 border-[#0265DC]' : 'text-[#66696D]'}`}>
//           <Image src="/assets/icons/Settings/header/Payment.svg" width={24} height={24} alt="Card" />
//           <span className="ml-2">Payment and Subscription</span>
//         </Link>
//       </nav>
//     </div>
//   );
// });
// // };

// // Add displayName to resolve the ESLint error
// Header.displayName = "Header";

// export default Header;
