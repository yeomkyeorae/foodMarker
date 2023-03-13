import React from "react";
import * as S from "./TextInput.style";

interface Props {
    id?: string,
    value: string,
    placeholder: string,
    onChange: any,
    onKeyPress?: any,
    readOnly?: boolean
}

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { id, value, placeholder, onChange, onKeyPress, readOnly } = props;

    return <S.Input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        readOnly={readOnly}
        ref={ref}
    />
})

export default TextInput;
