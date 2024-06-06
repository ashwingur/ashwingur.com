import Head from "next/head";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import Projects from "../components/Projects";
import Apps from "../components/Apps";
import Footer from "../components/Footer";
import RandomPoem from "../components/RandomPoem";

export default function Home() {
  // const appContext = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Ashwin Gur</title>
        <meta name="description" content="Ashwin Gur's Website" key="desc" />

        {/* FB Meta Tags */}
        <meta property="og:title" content="Ashwin Gur" />
        <meta property="og:description" content="Ashwin Gur's Website" />
        <meta
          property="og:image"
          content="https://www.ashwingur.com/logo.png"
        />
        <meta property="og:url" content="https://www.ashwingur.com"></meta>

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Ashwin Gur" />
        <meta name="twitter:description" content="Ashwin Gur's Website" />
        <meta
          name="twitter:image"
          content="https://www.ashwingur.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fixed={true} />

      <div className="mb-8">
        <HomeSection />
        <div className="bg-background p-4">
          <h1 className="text-primary">Hello, World!</h1>
          <p className="text-secondary">This is an example component.</p>
          <button className="bg-primary text-text-button hover:bg-primary-hover p-2">
            Click Me
          </button>
        </div>
        <Apps />
        <Projects />
        <RandomPoem />
      </div>
      <Footer />
    </div>
  );
}
