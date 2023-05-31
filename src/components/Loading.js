import PuffLoader from "react-spinners/PuffLoader";

export default function Loading({}) {
  return (
    <>
      <div
        className="bg-light d-flex justify-content-center align-items-center flex-column"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
        }}
      >
        <PuffLoader color="#354259" size={100} />
        <h4 className="mt-5">Data Fetching</h4>
      </div>
    </>
  );
}
