import Head from "next/head";
import Hangman from "../components/hangman";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hangman Game</title>
      </Head>
      <main>
        <Hangman />
      </main>
    </div>
  );
}
