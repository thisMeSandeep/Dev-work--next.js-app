import Footer from "./components/Footer";
import Header from "./components/header";

export const metadata = {
  title: "WeWork",
  description: "Public pages layout",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="mt-20">{children}</main>
      <section className="mt-20">
        <Footer />
      </section>
    </div>
  );
}
