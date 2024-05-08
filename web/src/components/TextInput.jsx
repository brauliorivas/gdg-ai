export default function TextInput({ value, setValue }) {
  return (
    <input className=" border-black border-b-2 p-2 w-[500px] outline-none "
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
