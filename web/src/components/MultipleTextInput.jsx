export default function MultipleTextInput({ values, setValues}) {
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      setValues([...values, event.target.value.trim()]);
      event.target.value = "";
    }
  };
  
    return (
    <div className="border-black border-b-2  p-2 w-full outline-none">
        {values.map((value, index) => (
            <div key={index}>
                {value}
            </div>
        ))}
        <input 
            type="text"
            onKeyDown={handleKeyDown}
        />
    </div>
  )
}
