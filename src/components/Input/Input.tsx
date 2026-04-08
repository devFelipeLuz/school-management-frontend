import { DefaultInput } from "./styles";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
    return <DefaultInput {...props} />
}

export default Input;