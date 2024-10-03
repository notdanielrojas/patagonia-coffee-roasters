"use client";
import Image from "next/image";

interface CoffeeImageProps {
  image: string;
  name: string;
}

export function CoffeeImage({ image, name }: CoffeeImageProps) {
  return (
    <Image
      src={image}
      alt={"Picture of " + name}
      priority
      fill
      style={{ objectFit: "contain" }}
      className=''
      onLoadingComplete={(image) => image.classList.remove("opacity-0")}
    />
  );
}
