import { VideoIcon } from "lucide-react";


function CallButton({handleVideoCall}){
    return (
      <div className="p-3 border-b flex items-center justify-start max-w-7xl mx-auto w-full absolute top-0">
        <button
          onClick={handleVideoCall}
          className="btn btn-primary btn-md  text-white"
        >
          <VideoIcon className="w-6 h-6" />
        </button>
      </div>
    );
}


export default CallButton;