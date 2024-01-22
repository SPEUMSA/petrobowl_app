import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logospe from "/public/image/logo_blanco.png";
import logopetrobowl from "/public/image/logo_petrobowl_noyear-evergreen.png";
export default function Principal() {
  const [formData, setFormData] = useState({
    nombrePartida: "",
    fecha: "",
    noParticipantes: 0,
    modalidad: "",
    tiempo: 0,
    unidadMedida: "Segundos",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Grid
        sx={{
          margin: "10px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GridItem gap={3}>
          <Image src={logopetrobowl.src} alt="logo" width={200} height={200} />
        </GridItem>
        <GridItem>
          <FormControl>
            <Grid gap={3}>
              <GridItem>
                {" "}
                <FormLabel>Nombre de la partida</FormLabel>
                <Input
                  type="text"
                  name="nombrePartida"
                  onChange={handleChange}
                />
                <FormHelperText>Dale un nombre a esta partida.</FormHelperText>
              </GridItem>

              <GridItem>
                <FormLabel>Fecha</FormLabel>
                <Input type="date" name="fecha" onChange={handleChange} />
              </GridItem>
              <GridItem>
                <FormLabel>Numero de participantes</FormLabel>
                <NumberInput max={30} min={2}>
                  <NumberInputField
                    name="noParticipantes"
                    onChange={handleChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </GridItem>
              <GridItem>
                <FormLabel as="legend">Modalidad de competencia</FormLabel>
                <RadioGroup defaultValue="Individuales" name="modalidad">
                  <HStack spacing="24px" onChange={handleChange}>
                    <Radio value="Equipos">Equipos</Radio>
                    <Radio value="Individuales">Individuales</Radio>
                  </HStack>
                </RadioGroup>
              </GridItem>
              <GridItem>
                <FormLabel>Tiempo de respuesta</FormLabel>
                <NumberInput max={30} min={1}>
                  <NumberInputField name="tiempo" onChange={handleChange} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box sx={{ height: "10px" }} />
                <Select name="unidadMedida" onChange={handleChange}>
                  <option>Segundos</option>
                  <option>Minutos</option>
                </Select>
              </GridItem>
            </Grid>
          </FormControl>
          <Link
            href={{
              pathname: "/pagina-principal/index",
              query: formData,
            }}
            passHref
          >
            <Button mt={4} colorScheme="teal">
              Iniciar
            </Button>
          </Link>
        </GridItem>
        <Box sx={{ height: "10px" }} />
        <Image src={logospe.src} alt="logospe" width={90} height={90} />
      </Grid>
    </>
  );
}
