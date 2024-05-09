import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.webp";

export default function Puente({ height = 150}) {
  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="logo" height={height} />
      </Link>
    </div>
  )
}
