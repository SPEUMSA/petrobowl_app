import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

interface ImportarArchivoType {
  titulo: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ImportarArchivoModal = ({
  titulo,
  onChange,
}: ImportarArchivoType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [datos, setDatos] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [tituloArchivo, setTituloArchivo] = useState<string>(
    "Seleccionar archivo"
  );
  const archivoCambia = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos(e);
    const titulo = e.target.value.split("\\").pop()?.toString() ?? "";
    setTituloArchivo(titulo);
  };
  const aceptarArchivo = () => {
    if (datos) onChange(datos);
    onClose();
  };
  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Importar preguntas
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titulo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="container-input">
              <input
                type="file"
                id="file-5"
                className="inputfile inputfile-5"
                onChange={(e) => archivoCambia(e)}
              />
              <label>
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="iborrainputfile"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                  </svg>
                </figure>
                <Text color={"Highlight"}>{tituloArchivo}</Text>
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              sx={{ zIndex: "10" }}
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Cerrar
            </Button>

            <Button
              sx={{ zIndex: "10" }}
              colorScheme="blue"
              mr={3}
              onClick={aceptarArchivo}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
