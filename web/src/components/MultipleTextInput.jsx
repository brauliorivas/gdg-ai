export default function MultipleTextInput({ values, setValues}) {
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      setValues([...values, event.target.value]);
      event.target.value = "";
    }
  };
  
    return (
    <div>
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
