import Hero from "@/components/Hero";
import Title from "@/components/Title";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Title />
      <p
        style={{
          fontSize: "16px",
          color: "#fff",
          borderRadius: "5px",
          marginLeft: "80px"
        }}
      >
        Click and Add your text in the white space
      </p>
      <Hero />
    </main>
  );
}
