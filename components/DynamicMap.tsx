import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), { ssr: false });

//INFO Este componente asegurara que al momento de compilar el mapa el objeto window no sea undefined
export default function RenderMap() {
  return <DynamicMap />;
}
