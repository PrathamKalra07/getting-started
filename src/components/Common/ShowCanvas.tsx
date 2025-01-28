import { useRef } from "react";

interface Props {
    width: number | undefined;
    height: number | undefined;
    // canvasRef: 
}

export const ShowCanvas: React.FC<Props> = ({
  width,
  height
}) => {
    let canvasRef = useRef<HTMLCanvasElement>(null);
    
    return <canvas
    ref={canvasRef}
    width={width}
    height={height}
    style={{
      borderRadius: "5px",
      boxShadow: "0 2px 5px gray",
    }}
  />;
}