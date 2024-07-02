import Card from "@components/Card";
import TipTap from "@components/TipTap";
import CreateOrUpdateReviewForm from "@components/mediareviews/MediaReviewForm";
import Navbar from "@components/navbars/Navbar";

const TipTapTest = () => {
  return (
    <div className="min-h-screen pb-8">
      <Navbar fixed={true} />
      <h1 className="text-center pt-24">Tip Tap Test</h1>
      <Card
        firstLayer={false}
        className="flex flex-col items-center justify-center mx-4 lg:mx-auto lg:w-2/3 "
      >
        <CreateOrUpdateReviewForm className="mb-10 w-full px-4" />
      </Card>
    </div>
  );
};

export default TipTapTest;
