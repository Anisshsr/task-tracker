

const Button = ({color,text,onClick}) => {

  return (
       <button 
        onClick = {onClick}
        style = {{backgroundColor : color, transition:"0.5s"}} className="btn">{text}</button>
  )
}

export default Button
