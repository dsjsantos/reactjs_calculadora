import { useRef, useState } from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import GlobalStyles from './global.js';
import { Container, CalcWrapper, ThemeToggle } from './styles.js';

import CalcButtonPanel from '../components/calcButtonPanel/calcButtonPanel.js';
import CalcDisplay from '../components/calcDisplay/calcDisplay.js';

import imgLight from '../assets/images/light.svg';
import imgDark from '../assets/images/dark.svg';

import { OPERATION } from '../core/enums.js';

const MAX_LENGTH = 24;

const shouldForwardProp = (propName, target) => {
    if (typeof target === "string") {
        return isPropValid(propName); // For HTML elements, forward the prop if it is a valid HTML attribute
    }
    return true;
}

const App = () => {
    const displayRef = useRef(null);
    const [ darkMode, setDarkMode ] = useState(true);
    const [ history, setHistory ] = useState([]);
    const [ currentValue, setCurrentValue ] = useState("0");
    const [ currentSign, setCurrentSign ] = useState("+");
    const themeTitle = darkMode ? 'Light Mode' : 'Dark Mode';
    const themeImage = darkMode ? imgLight : imgDark;
    
    const clearEntry = () => {
        setCurrentValue("0");
        setCurrentSign("+")
    }

    const handleNumberClick = value => {
        if((`${value}`).match("^[0-9]$")) {
            if(currentValue.length < MAX_LENGTH) {
                setCurrentValue(prev => `${prev}${value}`.replace(/^0*(\d)(.*)/, "$1$2"));
            }
        }
    }

    const handleOperClick = oper => {
        console.log('Operation:', oper);
        switch(oper) {
            case OPERATION.CLR:
                setHistory([]);
                clearEntry();
            break;
            case OPERATION.CLR_ENTRY:
                clearEntry();
            break;
            case OPERATION.BCK_SPACE:
                const newValue = currentValue.slice(0, -1).replace(/\.$/, "") || "0";
                setCurrentValue(newValue);
                if(newValue === "0") {
                    clearEntry();
                }
            break;
            case OPERATION.TGL_SIGN:
                setCurrentSign(curr => curr === "+" ? "-" : "+");
            break;
            case OPERATION.FRAC:
                if(currentValue.indexOf('.') < 0) {
                    setCurrentValue(prev => `${prev}.`);
                }
            break;
            
            
            default:
                console.error("Operation not supported yet: " + oper);
        }
    }

    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <GlobalStyles/>
            <Container id="appContainerId" darkMode={darkMode}>

                <CalcWrapper id="calcWrapperId" darkMode={darkMode}>
                    <ThemeToggle 
                        darkMode={darkMode} 
                        title={themeTitle}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <img src={themeImage} alt={themeTitle} />
                    </ThemeToggle>
                    <CalcDisplay 
                        ref={displayRef}
                        id="calcDisplayId" 
                        darkMode={darkMode}
                        history={history} 
                        value={`${currentSign !== "+" ? currentSign : ''}${currentValue}`}
                    />
                    <CalcButtonPanel 
                        id="calcButtonPanelId"
                        darkMode={darkMode}
                        onClickNumber={handleNumberClick}
                        onClickOperation={handleOperClick}
                    />
                </CalcWrapper>

                <input type='button' value="Scroll" onClick={() => displayRef.current.scrollToEndOfHistory()}/>

            </Container>
        </StyleSheetManager>
    );
}
export default App;
