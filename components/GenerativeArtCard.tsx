import Image from "next/image";
import Link from "next/link";
import Card from "@components/Card";

interface GenerativeArtProps {
  name: string;
  url: string;
  image: string;
  description: string[];
}

const GenerativeArtCard = ({
  name,
  url,
  image,
  description,
}: GenerativeArtProps) => {
  let descriptionJSX = description.map((item, index) => (
    <p key={index}>{item}</p>
  ));

  return (
    <Card firstLayer={true} className="flex !p-0">
      <Link
        className="h-full w-full hover:bg-background-hover p-4 transition-all hover:text-text"
        href={url}
      >
        <div className="w-full h-72 xl:h-96 2xl:h-[30rem] relative rounded-xl overflow-hidden">
          <Image
            unoptimized={true}
            alt={name}
            src={image}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2 className="text-center my-4">{name}</h2>
        <div className="flex flex-col gap-2">{descriptionJSX}</div>
      </Link>
    </Card>
  );
};

export default GenerativeArtCard;
