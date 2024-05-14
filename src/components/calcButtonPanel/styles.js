import styled from "styled-components";

export const ButtonContainer = styled.div`
    padding: 0.5em;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

export const ButtonWrapper = styled.div`
    cursor: pointer;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2B2B2B;
    color: #fff;
    font-size: 1.75rem;
    font-weight: 700;
`

export const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ButtonCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${props => (props.colWidth ? props.colWidth : 'unset')};

    &:not(:first-child) {
        margin-left: 0.3rem;
    }
`
