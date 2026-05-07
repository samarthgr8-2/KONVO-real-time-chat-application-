//the login page has a custom hook in useLogin.js file but i have not done that for signup it is not a big issue



import { useMutation , useQueryClient} from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { login } from '../lib/api.js';
import { Sparkle } from "lucide-react";
import { Link } from "react-router";
import useLogin from '../hooks/useLogin.js';

const LoginPage = () => {


const [loginData , setLoginData]= useState({
  email : "",
  password : "",
});

//done this using custom hooks in useLogin.js file
// const queryClient = useQueryClient();

// const {mutate:loginMutation,isPending,error}=useMutation({
//   mutationFn : login ,
//   onSuccess:()=>queryClient.invalidateQueries({queryKey : ["authUser"]}),
// });



const {isPending , error ,loginMutation}= useLogin();



const handleLogin  = (e)=>{

  e.preventDefault();
  loginMutation(loginData);
}



  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <Sparkle className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
              {/* tracking-wider in Tailwind CSS is used to increase letter spacing
              (space between characters). */}
              KONVO
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-3 pt-3">
                <div>
                  <h2 className="text-xl font-semibold opacity-70">
                    Welcome Back!
                  </h2>
                  <p className="text-sm opacity-60 mt-2">
                    Sign In to continue your language learning journey.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* EMAIL INPUT */}
                  <div className="form-control w-full mt-2 space-y-2">
                    <label className="label">
                      <span className="label-text  opacity-80 ">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="form-control w-full mt-2 space-y-2">
                    <label className="label">
                      <span className="label-text opacity-80">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full tracking-widest mt-6 font-bold hover:text-white hover:bg-[#fc4eb7] "
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* SIGN UP LINK */}
                  <div className="text-center mt-4 ">
                    <p className="text-sm opacity-80">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline cursor-pointer"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ILLUSTRATION SECTION */}
        <div className="bg-[#1a103d] hidden lg:flex w-full lg:w-1/2  items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-xl ">
          {/* bg-primary/10  and blur effect behind the illustration*/}
          <div className="max-w-md p-8 ">
            {/* Illustrations */}
            <div className="relative aspect-square max-w-sm mx-auto ">
              <img
                src="groupchat.png"
                alt="Video Call Illustration 2"
                className="w-full h-full hover:scale-105 transition duration-300 cursor-pointer"
              />
            </div>

            {/* CAPTION */}
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold opacity-80">
                Your gateway to global language exchange
              </h2>
              <p className="opacity-70">
                Turn practice into real conversations. Build confidence with
                global language partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
