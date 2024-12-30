import './index.css'

const Button = ({type, children, ...props}) => {
    let className;
    if (type === "solid") 
        className = "btn-solid"
    else if (type === "outline")
        className = "btn-outline"
    else if (type === "cta")
        className = "btn-solid"

    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}

export default Button