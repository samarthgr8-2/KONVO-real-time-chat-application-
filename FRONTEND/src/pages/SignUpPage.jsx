import React from 'react'
import { useState } from 'react';
import { Sparkle } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {signUp} from '../lib/api.js';

const SignUpPage = () => {
  const [signUpData, setSignUpData] =useState({
    fullName : "",
    email : "",
    password : "",
  });


  const queryClient = useQueryClient()



  const {mutate:signUpMutation,isPending, error} = useMutation({
    mutationFn : signUp,
    onSuccess : () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });




  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(signUpData);
  }



  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" 
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Form Left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col ">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <Sparkle className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
              {/* tracking-wider in Tailwind CSS is used to increase letter spacing
              (space between characters). */}
              KONVO
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-3 pt-3">
                <div>
                  <h2 className="text-xl font-semibold opacity-70 ">
                    Create an Account
                  </h2>
                  <p className="text-sm opacity-60">
                    Discover a new way to connect with KONVO.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULL NAME */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text opacity-80 ">Full Name</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input input-bordered w-full"
                      value={signUpData.fullName}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text opacity-80 ">Email</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text opacity-80 ">Password</span>
                    </label>

                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-60 mt-2 font-bold text-red-400 tracking-wide">
                      Password must be of minimum 6 characters !
                    </p>
                  </div>

                  {/* AGREE CHECKBOX */}
                  <div className="form-control">
                    <label className="label justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm cursor-pointer border-4"
                        required
                      />
                      <span className="text-xs leading-tight opacity-80">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  className="btn btn-primary w-full tracking-widest font-bold hover:text-white hover:bg-[#fc4eb7] "
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* ALREADY HAVE AN ACCOUNT */}
                <div className="text-center mt-4 ">
                  <p className="text-sm opacity-80">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline cursor-pointer"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* FORM RIGHT SIDE */}

        <div className="bg-[#1a103d] hidden lg:flex w-full lg:w-1/2  items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-xl ">
          {/* bg-primary/10  and blur effect behind the illustration*/}
          <div className="max-w-md p-8 ">
            {/* Illustrations */}
            <div className="relative aspect-square max-w-sm mx-auto ">
              <img
                src="Video call-amico2.png"
                alt="Video Call Illustration"
                className="w-full h-full hover:scale-105 transition duration-300 cursor-pointer"
              />
            </div>

            {/* CAPTION */}
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold opacity-80">
                Break language barriers with global partners
              </h2>
              <p className="opacity-70">
                Your global language partner is just one click away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage