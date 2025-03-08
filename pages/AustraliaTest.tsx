import React, { useRef, useEffect, forwardRef } from "react";
import Navbar from "@components/navbars/Navbar";
import AustraliaSVG from "/public/assets/australia.svg"; // Import the SVG component

// eslint-disable-next-line react/display-name
const MySVG = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} {...props}>
      <AustraliaSVG />
    </svg>
  ),
);

const AustraliaTest = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Create a reference to the SVG element

  // Set colour of all paths by default
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll<SVGPathElement>("path"); // Get all path elements
      paths.forEach((path) => {
        path.style.fill = "grey"; // Set each path's fill to green
        path.style.stroke = "black"; // Optional: Set the stroke color to black
      });
    }
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  // Event handler for path click
  const handleStateClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement; // Cast the event target to an SVG path element

    // Ensure the target is an SVG path
    console.log(target.id); // Log the path ID
    target.style.fill = "green"; // Change the fill color of the clicked path
    target.style.stroke = "black"; // Change the stroke color of the clicked path
  };

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pt-20 text-center">Australia Test</h1>

      {/* Attach ref to the SVG component */}
      <MySVG
        className="h-[500px] w-[500px]"
        ref={svgRef} // Use the ref here to attach it to the SVG element
        onClick={handleStateClick} // Attach the click event to the entire SVG
      />
    </div>
  );
};

export default AustraliaTest;
