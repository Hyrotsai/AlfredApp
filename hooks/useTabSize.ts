/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

export function useTabSize() {
    const [tabSize, setTabSize] = useState<"sm" | "md" | "lg">("md");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setTabSize("sm");
            else if (window.innerWidth < 1024) setTabSize("md");
            else setTabSize("lg");
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return tabSize;
}