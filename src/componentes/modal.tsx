import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import ContadorRegresivo from "./contador";

interface ModalType {
  titulo: string;
  respuestaValor: string;
  imagen: string;
  valor: number;
  preguntaValor: string;
  tiempo: string;
}

export default function ModalComponente({
  titulo,
  preguntaValor,
  imagen,
  valor,
  respuestaValor,
  tiempo,
}: ModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pregunta, setPregunta] = useState(true);
  const [respuesta, setRespuesta] = useState(false);
  const mostrarPregunta = () => {
    setPregunta(true);
    setRespuesta(false);
  };
  const mostrarRespuesta = () => {
    setPregunta(false);
    setRespuesta(true);
  };
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    onOpen();
  };
  return (
    <>
      <GridItem
        onClick={handleClick}
        sx={{
          width: "200px",
          padding: "30px",
          height: "100px",
          border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          cursor: "pointer",
          backgroundColor: clicked ? "lightcoral" : "black",
          "&:hover": {
            backgroundColor: "coral",
          },
          transition: "background-color 0.3s ease",
        }}
      >
        {valor}
        <Image src={imagen} alt="logospe" width={50} height={50} />
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titulo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pregunta && <Text fontSize="2xl">{preguntaValor}</Text>}
            {respuesta && <Text fontSize="2xl">{respuestaValor}</Text>}
            <ContadorRegresivo inicio={Number(tiempo)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            {pregunta && (
              <Button colorScheme="blue" mr={3} onClick={mostrarRespuesta}>
                Mostrar respuesta
              </Button>
            )}
            {respuesta && (
              <Button colorScheme="blue" mr={3} onClick={mostrarPregunta}>
                Mostrar pregunta
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
