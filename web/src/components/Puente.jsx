import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.webp";

export default function Puente() {
  return (
    <div>
      <Link href="/">
        <Image src={logo} alt="logo" height={150} />
      </Link>
    </div>
  )
}
