import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useLocation,Link } from 'react-router';
import { BellDotIcon, HomeIcon, Sparkle, User2Icon } from "lucide-react";

const Sidebar = () => {
    const  {authUser}=useAuthUser();
    const  location=useLocation();
    const currentPath=location.pathname;

  return (
    <aside
      className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen
   sticky top-0"
    >
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <Sparkle className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
            {/* tracking-wider in Tailwind CSS is used to increase letter spacing
              (space between characters). */}
            KONVO
          </span>
        </Link>
      </div>

      {/* Nav bar */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost  justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span className="opacity-80">Home</span>
        </Link>

        {/* <Link
          to="/friends"
          className={`btn btn-ghost  justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <User2Icon className="size-5 text-base-content opacity-70" />
          <span className="opacity-80">Friends</span>
        </Link> */}

        <Link
          to="/notifications"
          className={`btn btn-ghost  justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellDotIcon className="size-5 text-base-content opacity-70" />
          <span className="opacity-80">Notifications</span>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar bg-[#bff42f] rounded-full">
            <div className="size-12 rounded-full ">
              <img src={authUser?.profilePicture} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm opacity-80">
              {authUser?.fullName}
            </p>
            <p className="text-xs pt-2  text-success flex items-centerg gap-1">
              <span className="size-2 mt-1 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
