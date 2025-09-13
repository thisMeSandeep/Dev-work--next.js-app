import Footer from "./components/Footer";
import Header from "./components/header";

export const metadata = {
  title: "DevWork - Hire & Work with Top Developers",
  description:
    "DevWork is a platform to connect with skilled developers for your projects. Find, hire, and collaborate with top talent efficiently.",
  keywords: "DevWork, hire developers, freelance developers, remote developers, software development, tech projects",
  authors: [{ name: "DevWork Team", url: "https://devwork.com" }],
  robots: "index, follow",
  openGraph: {
    title: "DevWork - Hire & Work with Top Developers",
    description:
      "DevWork connects you with skilled developers for your projects. Hire top talent and collaborate seamlessly.",
    url: "https://devwork.com",
    siteName: "DevWork",
    images: [
      {
        url: "/assets/devwork.png",
        width: 1200,
        height: 630,
        alt: "DevWork - Hire top developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },

};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="mt-10">{children}</main>
      <section className="mt-20">
        <Footer />
      </section>
    </div>
  );
}
