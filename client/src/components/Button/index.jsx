import './index.css'

const Button = ({type, children, className, ...props}) => {
    let mainClassName;

    if (type === "solid") 
        mainClassName = "btn-solid"
    
    else if (type === "outline")
        mainClassName = "btn-outline"
    
    else if (type === "cta")
        mainClassName = "btn-solid"

    else if (type === "submit") {
        return (
            <button className={`${"btn-solid"} ${className}`} type={type} {...props}>
                {children}
            </button>
        )
    }

    
    return (
        <button className={`${mainClassName} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button