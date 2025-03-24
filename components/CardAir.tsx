import Link from "next/link";
import Image from "next/image";

export default function CardAir({ flight }: { flight: any }) {
  return (
    <Link
      className="w-[100%] xl:w-[100%] motion-safe:animate-slide-in"
      href={`/flight?id=${flight.iata_code}`}
    >
      <div className="relative bg-gradient-to-r from-[#3F495F] to-[#0E1934] text-white rounded-lg p-6 shadow-lg flex items-center w-[100%] xl:w-[100%]  xl:h-[235px] border border-white">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold dark:text-gray-900">
            {flight.airport_name}
          </h2>
          <p className="text-lg opacity-75">
            {flight.country_name ? flight.country_name : "No Pais"}
          </p>
          <span className="text-[42px] font-medium text-blue-400 mt-2">
            {flight.country_iso2}
          </span>
        </div>

        <div className="absolute top-0 right-0 overflow-hidden opacity-30 w-[45%] h-full">
          <Image
            alt="Avión"
            layout="fill"
            objectFit="cover"
            src="/avion2.jpg"
          />
        </div>

        <div className="absolute top-3 right-3  rounded-full shadow-lg">
          <Image
            alt="Avión"
            height={55}
            objectFit="cover"
            src="/icon1.png"
            width={55}
          />
        </div>
      </div>
    </Link>
  );
}
