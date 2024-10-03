import Image from "next/image";

export function Logo({alt }: { id: string; alt: string }) {
  return <Image src={"/images/logo/pcr-logo.png"} alt={alt} width='200' height='150' />;
}

export function LogoPCR() {
  return <Logo id='logo' alt='Patagonia Coffe Roasters Logo' />;
}
