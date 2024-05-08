import Image from "next/image";
import Link from "next/link";

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
    <Link
      className="bg-gray-600 hover:bg-gray-700 hover:dark:bg-gray-800 bg-opacity-20 hover:bg-opacity-40 hover:dark:bg-opacity-40 px-8 pt-8 pb-4 rounded-xl shadow-md hover:shadow-lg transition-all"
      href={url}
    >
      <div className="w-full h-72 xl:h-96 2xl:h-[30rem] relative rounded-xl overflow-hidden">
        <Image
          alt={name}
          src={image}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2 className="text-center my-4">{name}</h2>
      <div className="flex flex-col gap-2">{descriptionJSX}</div>
    </Link>
  );
};

export default GenerativeArtCard;
