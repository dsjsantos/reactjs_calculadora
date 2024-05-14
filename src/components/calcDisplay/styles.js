import styled from "styled-components";

export const DisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    width: 100%;
    height: 140px;
    background-color: ${props => (props.darkMode ? '#7FFFD0' : '#e0ffef')};
    color: #24493D;

    font-family: 'Roboto';
    font-size: 1.1rem;
    text-align: right;
`

export const DisplayCurrentValue = styled.div`
    width: 100%;
    align-self: flex-end;
    padding: 0.25rem 0.75rem;

    font-size: 2rem;
    font-weight: bold;
    color: #1C382F;
    background-color: transparent;
`

export const HistoryContainer = styled.div`
    position: relative;
    width: 100%;
    align-self: flex-end;
    padding: 0;
    overflow-x: auto;
`

export const HistoryTopSpace = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.25rem;
    background-color: ${props => (props.darkMode ? '#7FFFD0' : '#e0ffef')};
`

export const HistoryContent = styled.div`
    width: 100%;
    padding: 0 0.75rem;
`

export const HistoryRow = styled.div`
    width: 100%;
    padding: 0.15rem 0;

    &:first-child {
        padding-top: 0rem !important
    }    
`

export const HistOper = styled.span`
    margin-right: 0.5em;
    font-size: 0.9rem;
`
