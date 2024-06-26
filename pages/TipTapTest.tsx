import TipTap from "@components/TipTap";
import Navbar from "@components/navbars/Navbar";

const TipTapTest = () => {
  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="text-center pt-24">Tip Tap Test</h1>
      <TipTap />
    </div>
  );
};

export default TipTapTest;
