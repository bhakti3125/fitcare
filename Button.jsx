import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${({ small }) => (small ? "6px 12px" : "10px 20px")};
  font-size: ${({ small }) => (small ? "12px" : "16px")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
`;

const Button = ({ text, isLoading, isDisabled, small, onClick }) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={isDisabled}   // ✅ use `disabled` (valid HTML attr)
      small={small ? 1 : 0}   // ✅ styled-components will consume this
    >
      {isLoading ? "Loading..." : text}
    </StyledButton>
  );
};

export default Button;
