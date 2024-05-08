import Link from "next/link"

export default function Register({ type, link }) {
  return (
    <div>
        <Link href={link}>
        {type}
        </Link>
    </div>
  )
}
