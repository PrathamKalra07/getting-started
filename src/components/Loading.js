import { useEffect, useRef, useState } from "react";
// import PuffLoader from "react-spinners/PuffLoader";
import LoadingGif from "../assets/img/loading.gif";

export default function Loading({}) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column loading-container">
        <img src={LoadingGif} className="loading-logo-gif" alt="loading" />

        <h4 className="mt-5">Data Fetching</h4>
      </div>
    </>
  );
}
