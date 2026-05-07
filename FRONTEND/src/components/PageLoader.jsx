// import { Loader2Icon, LoaderIcon } from 'lucide-react'
// import React from 'react'

// const PageLoader = () => {
//   return (
//     <div className='min-h-screen flex items-center justify-center'>
//         <LoaderIcon className='animate-spin size-10 text-primary' />
//     </div>
//   )
// }

// export default PageLoader

import React from 'react'
import { useThemeStore } from '../store/useThemeStore';

const PageLoader = () => {
  const {theme}=useThemeStore();
  return (
    <div className=" h-screen flex  flex-col gap-4 p-10" data-theme={theme}>
      <div className="skeleton bg-[#110c24] h-32 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-28"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-32 w-full"></div>
      <div className="skeleton bg-[#110c24] h-32 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-32 w-full"></div>
      <div className="skeleton bg-[#110c24] h-32 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
      <div className="skeleton bg-[#110c24] h-4 w-full"></div>
    </div>
  );
}

export default PageLoader