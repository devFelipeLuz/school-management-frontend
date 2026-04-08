import { DefaultButton } from "./styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button (props: ButtonProps) {
    return (
        <DefaultButton {...props}>{props.children}</DefaultButton>
    );
}

export default Button;