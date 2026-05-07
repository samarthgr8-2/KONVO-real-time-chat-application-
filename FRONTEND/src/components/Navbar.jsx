import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js';
import { useLocation,Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import { BellDotIcon, LogOutIcon, Sparkle } from "lucide-react";
import ThemeSelector from './ThemeSelector.jsx';

const Navbar = () => {
  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith('/chat');

  const queryClient = useQueryClient();

 const {mutate : logoutMutation} =useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  });





  return (
    <nav className="bg-base-200 border-b  border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-1">{/*px-8 as per the tutorial*/}
        <div className="flex items-center justify-end w-full">
          {/* Logo only if we are in the chat page */}

          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <Sparkle className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
                  {/* tracking-wider in Tailwind CSS is used to increase letter spacing
              (space between characters). */}
                  KONVO
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto ">
            {/* ml-auto everything will be on the left side */}
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellDotIcon className="size-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar bg-[#bff42f] rounded-full ml-2">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePicture}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar