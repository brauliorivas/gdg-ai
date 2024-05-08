import Link from "next/link"

export default function Register({ type, link }) {
  return (
    <div className="mx-3 my-3 cursor-pointer bg-[rgb(252,118,65)] px-10 py-20 rounded text-[30px]"> 
        <Link href={link}>
        {type}
        </Link>
    </div>
  )
}
