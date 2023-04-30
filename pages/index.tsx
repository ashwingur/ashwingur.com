import Head from "next/head";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Apps from "../components/Apps";
import Footer from "../components/Footer";

export default function Home() {
  // const appContext = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Ashwin Gur</title>
        <meta name="description" content="Ashwin Gur's Portfolio Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fixed={true} />

      <div>
        <HomeSection />
        <Projects />
        <Apps />
        <Contact />
      </div>
      <Footer></Footer>
    </div>
  );
}
