import { MapPin, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

const marketplaces = Array(4).fill({
  title: "Real Estate",
  price: "₦19,000,000",
  location: "Lokongoma, Abuja",
  image: "/assets/img/jodex-image-1.jpg",
});

const MarketplaceCard = ({
  title,
  price,
  location,
  image,
}: (typeof marketplaces)[number]) => (
  <div className="bg-white rounded-md flex flex-col text-gray-900 shadow-lg">
    <div className="p-2">
      <Image src={image} alt={title} width={500} height={500} />
    </div>
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[15px] font-medium">{title}</p>
          <p className="text-[14px] font-light text-[#FF5B19]">{price}</p>
          <div className="flex items-center mt-5 gap-1">
            <MapPin className="w-4 h-4" />
            <p className="text-xs text-[#7F7F7F]">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PencilIcon className="w-3 h-3 cursor-pointer" />
          <Trash2Icon className="w-3 h-3 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
);

const MarketplaceCards = () => {
  return (
    <>
      <div className="p-6 bg-[#F2F5F8] shadow-sm rounded-md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold">Studio Apartment</h2>
          <button className="border-1 border-black px-10 py-2 rounded-md text-black font-medium text-[13px] cursor-pointer hover:bg-blue-900 hover:text-white hover:border-none transition duration-200 flex items-center gap-2">
            See More
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaces.map((marketplace, index) => (
            <MarketplaceCard key={index} {...marketplace} />
          ))}
        </div>
      </div>

      <div className="p-6 bg-[#F2F5F8] shadow-sm rounded-md mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold">1 Bedroom Apartment</h2>
          <button className="border-1 border-black px-10 py-2 rounded-md text-black font-medium text-[13px] cursor-pointer hover:bg-blue-900 hover:text-white hover:border-none transition duration-200 flex items-center gap-2">
            See More
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaces.map((marketplace, index) => (
            <MarketplaceCard key={index} {...marketplace} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MarketplaceCards;
