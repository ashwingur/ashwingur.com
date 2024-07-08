import { MediaReview } from "shared/validations/MediaReviewSchemas";
import MediaReviewCard from "./MediaReviewCard";

const MasonWrapper: React.FC<{ data: MediaReview, index: number }> = ({ data, index }) => {

    return <MediaReviewCard
        className="w-full m-8"
        review={data}
        index={index}
        key={data.id}
    />
};

export default MasonWrapper