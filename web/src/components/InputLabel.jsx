import Image from "next/image";
import arrow from "@/assets/arrow.svg";

export default function InputLabel({ prompt }) {
  return (
    <div className="flex flex-row items-start font-bold">
        <Image src={arrow} alt="arrow" height={20} />
        <span className="ml-3 font-bold">{prompt}</span>
    </div>
  )
}
