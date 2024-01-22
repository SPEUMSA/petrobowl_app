import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import * as XLSX from "xlsx";
import ModalComponente from "../../../componentes/modal";
import ImportarArchivoModal from "../../../componentes/modalArchivo";
import logospe from "/public/image/logo_blanco.png";
import logopetrbowl from "/public/image/logo_petrobowl_noyear-evergreen.png";
interface ExcelDataItem {
  ID: string;
  PREGUNTA: string;
  RESPUESTA: string;
  TIPO: string;
  VALOR: number;
}

interface ResultItem {
  TIPO: string;
  valores: {
    ID: string;
    PREGUNTA: string;
    RESPUESTA: string;
    VALOR: number;
  }[];
}

export default function Preguntas() {
  const router = useRouter();
  const {
    nombrePartida,
    fecha,
    noParticipantes,
    modalidad,
    tiempo,
    unidadMedida,
  } = router.query;
  const [excelData, setExcelData] = useState<ExcelDataItem[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
          });

          // Assuming each row has a similar structure, define a type for a row
          interface ExcelDataRow {
            [key: string]: string | number;
          }

          // Construir array de objetos con tipos específicos
          const header = jsonData[0] as string[];
          const dataObjects = jsonData.slice(1).map((row: string[]) => {
            const rowData: ExcelDataRow = {};
            header.forEach((prop, index) => {
              rowData[prop as keyof ExcelDataRow] = isNaN(Number(row[index]))
                ? row[index]
                : Number(row[index]);
            });
            return rowData;
          });

          // Assuming ExcelDataItem has properties ID, PREGUNTA, RESPUESTA, TIPO, VALOR
          const excelDataItems: ExcelDataItem[] = dataObjects.map(
            (dataObj) => ({
              ID: dataObj.ID as string,
              PREGUNTA: dataObj.PREGUNTA as string,
              RESPUESTA: dataObj.RESPUESTA as string,
              TIPO: dataObj.TIPO as string,
              VALOR: dataObj.VALOR as number,
            })
          );

          setExcelData(excelDataItems);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function obtenerElementosAleatorios(
    arrayOriginal: any,
    cantidadAExtraer: number
  ) {
    // Función de comparación aleatoria
    const comparacionAleatoria = () => Math.random() - 0.5;

    // Copia el array original y luego lo ordena aleatoriamente
    const arrayAleatorio = arrayOriginal.slice().sort(comparacionAleatoria);

    // Toma solo los primeros n elementos del array aleatorio, donde n es la cantidad deseada
    const arrayFinal = arrayAleatorio.slice(0, cantidadAExtraer);

    return arrayFinal;
  }

  const arrayTransformado: ResultItem[] = excelData.reduce(
    (acumulador, actual) => {
      const tipoExistente = acumulador.find(
        (item) => item.TIPO === actual.TIPO
      );

      if (tipoExistente) {
        tipoExistente.valores.push({
          ID: actual.ID,
          PREGUNTA: actual.PREGUNTA,
          RESPUESTA: actual.RESPUESTA.toString(),
          VALOR: actual.VALOR,
        });
      } else {
        acumulador.push({
          TIPO: actual.TIPO,
          valores: [
            {
              ID: actual.ID,
              PREGUNTA: actual.PREGUNTA.toString(),
              RESPUESTA: actual.RESPUESTA.toString(),
              VALOR: actual.VALOR,
            },
          ],
        });
      }

      return acumulador;
    },
    [] as ResultItem[]
  );

  function obtenerValoresMinimos(array: ResultItem[]): ResultItem[] {
    const nuevosObjetos = [];
    for (const objeto of array) {
      const valores = obtenerElementosAleatorios(objeto.valores, 5);
      const nuevoArray = { ...objeto, valores: valores };
      nuevosObjetos.push(nuevoArray);
    }
    return nuevosObjetos;
  }
  return (
    <>
      <Grid
        sx={{
          margin: "10px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GridItem gap={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Image src={logopetrbowl.src} alt="logo" width={200} height={200} />
        </GridItem>
        {nombrePartida}
        {fecha}
        {noParticipantes}
        {modalidad}
        {unidadMedida}
        <Grid sx={{ justifyContent: "center", margin: "10px" }}>
          <ImportarArchivoModal
            titulo="Importar preguntas"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          templateColumns="repeat(5, 1fr)"
        >
          {obtenerValoresMinimos(arrayTransformado).map((valor, index) => (
            <>
              <Grid
                key={index}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <GridItem
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                    border: "1px solid white",
                    backgroundColor: "#00009f",
                  }}
                >
                  <Text>{valor.TIPO}</Text>
                </GridItem>
                <GridItem>
                  {valor.valores
                    .sort((a, b) => a.VALOR - b.VALOR)
                    .map((a) => (
                      <ModalComponente
                        key={a.VALOR}
                        titulo={`This questions has ${a.VALOR} points`}
                        preguntaValor={`${a.PREGUNTA}`}
                        respuestaValor={`${a.RESPUESTA}`}
                        valor={a.VALOR}
                        imagen={logospe.src}
                        tiempo={tiempo?.toString() ?? "0"}
                      />
                    ))}
                </GridItem>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
