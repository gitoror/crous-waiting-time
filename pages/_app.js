import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Navbar from "@/components/navbar.js";
import Page from "@/components/page.js";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Projet sur les réseaux Mesh" />
        <meta name="author" content="TM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
        <title>Crous WT</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
          line-height: 1.4;
        }
        h1 {
          font-weight: 600;
        }
        h2 {
          font-weight: 500;
        }
      `}</style>
      <Navbar />
      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  );
}
