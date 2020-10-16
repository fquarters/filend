import React from "react"
import { HTMLAttributes } from "react"
import "./button.scss"

type ButtonProps = {

} & HTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => <button {...props}
    className={`button ${props.className}`} />

export default Button