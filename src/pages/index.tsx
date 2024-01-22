import Head from "next/head";
import { Inter } from "next/font/google";
import Principal from "./pagina-principal/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Principal />
    </>
  );
}
