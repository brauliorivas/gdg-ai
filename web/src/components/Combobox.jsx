"use client"

export function Combobox({ selected, setSelected}) {

  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="Tech">Tech</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Retail">Retail</option>
        <option value="Manufacturing">Manufacturing</option>
    </select>
  )
}
