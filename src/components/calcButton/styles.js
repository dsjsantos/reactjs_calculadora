import styled from "styled-components";

export const ButtonWrapper = styled.div`
    cursor: pointer;
    min-width: 64px;
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2B2B2B;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0.15em;
    background-color: ${props => (props.darkMode ? '#1f1f1f' : '#e0e0e0')};
    color: ${props => (props.darkMode ? '#fff' : '#000')};
    user-select: none;

    &:hover {
        opacity: 0.75;
        border: none;
        -webkit-box-shadow: inset 0px 0px 3px 1px rgba(22,199,158,1);
        -moz-box-shadow: inset 0px 0px 3px 1px rgba(22,199,158,1);
        box-shadow: inset 0px 0px 3px 1px rgba(22,199,158,1);
    }

    &:active {
        opacity: 1 !important;
        color: ${props => (props.darkMode ? '#0ac5ac' : '#1c9f87')};
    }
`
