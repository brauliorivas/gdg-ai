import MultipleTextInput from './MultipleTextInput'

export default function InfoFilter({name, values, setValues}) {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
      };
    
      const pStyle = {fontSize: 'smaller'}
    return (
        <div style={containerStyle}>
           <p style={pStyle}>{name+':'}</p>
           <MultipleTextInput values={values} setValues={setValues}/>
        </div>
    )
}