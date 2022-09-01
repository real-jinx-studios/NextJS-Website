import dynamic from "next/dynamic";
import Link from "next/link";
import LoaderDots from "./loaderDots";
import React, { useEffect, useState } from "react";

function LoadingCheck(props) {
  return !props.isLoading ? (
    <>{props.children}</>
  ) : (
    props.fallback || (
      <div className="loader-wrapper">
        <style jsx>{`
          .loader-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            padding: 0.5em 0;
          }
        `}</style>
        <LoaderDots size="ms" color="system" />
      </div>
    )
  );
}

export default dynamic(() => Promise.resolve(LoadingCheck), {
  ssr: false,
});
