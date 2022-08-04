import React from "react";
import styled from "styled-components";

const Input = styled.input`
  margin: 3px 0;
  padding: 15px 10px;
  min-width: 300px;
  max-width: 700px;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -ms-transition: 0.2s ease all;
  -o-transition: 0.2s ease all;
  transition: 0.2s ease all;
`;

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

    return <Input
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
