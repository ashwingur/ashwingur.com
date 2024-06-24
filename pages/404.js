import Navbar from "@components/navbars/ArtNavBar";

export default function Custom404() {
  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="text-center pt-20">404 - Page Not Found</h1>
    </div>
  );
}
