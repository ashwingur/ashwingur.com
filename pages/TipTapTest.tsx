import Card from "@components/Card";
import TipTap from "@components/TipTap";
import Navbar from "@components/navbars/Navbar";

const TipTapTest = () => {
  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="text-center pt-24">Tip Tap Test</h1>
      <Card
        firstLayer={true}
        className="flex flex-col items-center mx-4 lg:mx-auto lg:w-2/3 "
      >
        <TipTap className="mt-8 bg-background-muted w-full" />
      </Card>
    </div>
  );
};

export default TipTapTest;
