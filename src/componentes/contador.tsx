import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ContadorType {
  inicio: number;
}
export default function ContadorRegresivo({ inicio }: ContadorType) {
  const [contador, setContador] = useState(inicio);

  useEffect(() => {
    if (
      typeof inicio !== "number" ||
      inicio <= 0 ||
      !Number.isInteger(inicio)
    ) {
      console.error(
        "Por favor, proporciona un número entero positivo para comenzar la cuenta regresiva."
      );
      return;
    }

    const intervalo = setInterval(() => {
      setContador((prevContador) => {
        if (prevContador === 0) {
          clearInterval(intervalo);
          return 0;
        }
        return prevContador - 1;
      });
    }, 1000); // Intervalo de 1 segundo

    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, [inicio]);

  return (
    <Text fontSize="1xl" color={"Highlight"}>
      {contador === 0 ? "¡Without Time!" : `Time: ${contador}`}
    </Text>
  );
}
