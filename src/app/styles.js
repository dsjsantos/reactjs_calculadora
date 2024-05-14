import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    background-color: ${props => (props.darkMode ? '#1f1f1f' : '#e0e0e0')};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const CalcWrapper = styled.div`
    position: relative;
    min-height: 400px;
    min-width: 380px;

    color: ${props => (props.darkMode ? 'white' : 'black')};
    background-color: ${props => (props.darkMode ? '#181818' : '#d0d0d0')};
    border: solid 2px ${props => (props.darkMode ? '#2B2B2B' : '#b0b0b0')};
`

export const ThemeToggle = styled.div`
    cursor: pointer;
    opacity: 0.75;
    z-index: 1;
    padding: 0.25em;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${props => (props.darkMode ? '#181818' : '#d0d0d0')};

    &:hover {
        opacity: 1;
    }

    img {
        width: 100%;
        height: auto;
        filter: ${props => (props.darkMode ? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(281deg) brightness(104%) contrast(102%)' : 'invert(0%) sepia(100%) saturate(0%) hue-rotate(13deg) brightness(95%) contrast(105%);')};
    }
`
