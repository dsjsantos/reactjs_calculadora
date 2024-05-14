import styled from "styled-components";

export const CopiedToClipBoard = styled.div`
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5rem 1rem;
    border-radius: 10px;

    background-color: #038d84;
    color: #fff;

    user-select: none;
    white-space: nowrap;
    font-weight: 100;
    transition: all ease 0.5s;
    opacity: 0;

    &.visible {
        opacity: 1;
    }
`

export const DisplayContainer = styled.div`
position: relative;
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

    font-size: 1.1rem;
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
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    padding: 0.1rem 0;
    font-weight: 500;

    &:first-child {
        padding-top: 0rem !important
    }    
`

export const HistOper = styled.span`
    margin-right: 0.5em;
    font-size: 0.9rem;
    font-weight: inherit;
`

export const HistValue = styled.span`
    cursor: pointer;
    user-select: none;
`

export const CurrentOper = styled.span`
    margin-left: 0.25em;
    font-weight: inherit;
`
