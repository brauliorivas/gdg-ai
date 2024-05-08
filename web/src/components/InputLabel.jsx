import Image from "next/image";
import arrow from "@/assets/arrow.svg";

export default function InputLabel({ prompt }) {
  return (
    <div className="flex flex-row items-start ">
        <Image src={arrow} alt="arrow" height={20} />
        <span className="ml-3">{prompt}</span>
    </div>
  )
}
