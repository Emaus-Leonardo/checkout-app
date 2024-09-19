import React from "react";
import Loading from "./Loading";

const LoadingScreen = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mt-4">
          <Loading/>
        </div>
      </div>
    </div>
  );

export default LoadingScreen;