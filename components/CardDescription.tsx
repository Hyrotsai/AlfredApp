import Image from "next/image";

export default function CardDescription({
  titulo,
  datos,
  icon = "Info.svg",
}: {
  titulo: string;
  datos: any;
  icon: string;
}) {
  const datosArray = Object.keys(datos);

  return (
    <div
      className={`relative bg-gradient-to-r from-[#3F495F] to-[#0E1934] text-white rounded-lg p-6 shadow-lg flex  w-[100%] min-h-[100px] 2xl:h-[435px] border border-white mt-4 motion-safe:animate-fadeInLeft`}
    >
      <div className="flex flex-col">
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#0060FF] to-[#00FFE7] text-[20px] md:text-[40px] font-medium mb-2">
          <Image
            alt="Icono"
            className="inline"
            height={50}
            src={icon}
            width={50}
          />
          {"  "}
          {titulo}
        </p>

        {datosArray.map((dato: any, index: number) => (
          <p
            key={datosArray[index]}
            className="text-[16px] md:text-[30px] font-bold dark:text-gray-900"
          >
            {dato}: <span className="font-normal"> {datos[dato]}</span>
          </p>
        ))}
      </div>

      <div className="absolute top-0 right-0 overflow-hidden opacity-30 w-[45%] h-full">
        <Image alt="Avión" layout="fill" objectFit="cover" src="/avion2.jpg" />
      </div>
    </div>
  );
}
