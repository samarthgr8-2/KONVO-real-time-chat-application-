import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser.js';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import { completeOnboarding } from '../lib/api.js';
import { UserRoundPen, ShuffleIcon, MapPinIcon, ShipWheelIcon, LoaderIcon } from "lucide-react";
import { LANGUAGES } from '../constants/index.js';


const OnboardingPage = () => {

  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();




  const [formState , setFormState] = useState({
    fullName : authUser?.fullName || "",
    bio : authUser?.bio || "",
    nativeLanguage : authUser?.nativeLanguage || "",
    learningLanguage : authUser?.learningLanguage || "",
    location : authUser?.location || "",
    profilePicture : authUser?.profilePicture || "",
  });



  const {mutate : onboardingMutation , isPending}=useMutation({
    mutationFn : completeOnboarding ,
    onSuccess : ()=>{toast.success("User onboarded successfully", {
      className: "text-lg font-semibold",
    });
    queryClient.invalidateQueries({queryKey : ["authUser"]});
    },
    onError : (error)=>{
      //console.log(error);
      toast.error(error.response.data.message, {
        className: "text-lg font-semibold",
      });

    }
  })


  const handleSubmit = (e) =>{
    e.preventDefault();
    onboardingMutation(formState);
  }



  const handleRandomAvatar = () =>{
    const idx=Math.floor(Math.random() * 1000)+1;//1-1000 included 
    const randomAvatar = `https://api.dicebear.com/9.x/toon-head/svg?seed=${idx}`;

    setFormState({...formState, profilePicture : randomAvatar});
    toast.success("Random avatar generated successfully!",{
      className : "text-lg font-semibold"
    });
    
  };





  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 ">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl  ">
        <div className="card-body p-6 sm:p-8 ">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 opacity-70 ">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PICTURE CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4 ">
              {/* DP OR IMAGE PREVIEW */}
              <div className=" flex items-center justify-center size-32 rounded-full bg-[#ff9cd3] overflow-hidden border-4 border-[#7b5ce1] shadow-lg hover:size-[135px] cursor-pointer">
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt="ProfilePicture"
                    className="w-32 h-32 object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <UserRoundPen className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* GENERATE RANDOM AVATAR BUTTON */}
              <div className="flex items-center gap-1 ">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-primary w-full  text-lg pt-2 pb-2 font-semibold hover:text-white hover:bg-[#fc4eb7] hover:font-bold mt-3"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* FORM FIELDS CONTAINER */}
            {/* NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-70 text-lg">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                readOnly
                className="input input-bordered w-full opacity-70 focus:bg-[#250e3e] "
                placeholder="Your Full Name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-70 text-lg">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24 opacity-70 text-lg"
                placeholder="Tell others about yourself and your language learning goals."
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {/* NATIVE LANGUAGE */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text opacity-70 text-lg">
                    Native Language
                  </span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full opacity-60 cursor-pointer text-lg "
                >
                  <option value="" className="bg-gray-800 text-white">
                    Select your native language
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option
                      key={`native-${lang}`}
                      value={lang.toLowerCase()}
                      className="bg-gray-800 text-white font-md"
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text opacity-70 text-lg">
                    Learning Language
                  </span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full opacity-60 cursor-pointer text-lg "
                >
                  <option value="" className="bg-gray-800 text-white ">
                    Select language you're learning
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option
                      key={`learning-${lang}`}
                      value={lang.toLowerCase()}
                      className="bg-gray-800 text-white "
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg opacity-70">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 opacity-70"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-primary w-full text-lg font-semibold hover:text-white hover:bg-[#fc4eb7] hover:font-bold"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-7 opacity-70 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-7 opacity-70 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;






