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
    const [ currentEntry, setCurrentEntry ] = useState("0");
    const [ currentSign, setCurrentSign ] = useState("+");
    const [ currentOper, setCurrentOper ] = useState(null);
    const [ isTypingEntry, setTypingEntry ] = useState(false);
    const themeTitle = darkMode ? 'Light Mode' : 'Dark Mode';
    const themeImage = darkMode ? imgLight : imgDark;
    
    const calculateCurrentOperation = () => {
        const valueA = getPreviousValue();
        const valueB = getCurrentValue();
        console.log(`>>> Calculate (${valueA} ${currentOper} ${valueB})`);

        
    }

    const clearAll = () => {
        clearEntry();
        clearHistory();
        setCurrentOper(null);
    }

    const clearEntry = (typing) => {
        setCurrentEntry("0");
        setCurrentSign("+");
        setTypingEntry(typing ? true : false);
    }

    const clearHistory = () => setHistory([]);

    const getCurrentValue = () => parseFloat(`${currentSign}${currentEntry}`) || 0;

    const getPreviousValue = () => (history||[]).length ? history.slice(-1)[0].value : null;

    const handleNumberClick = value => {
        if((`${value}`).match("^[0-9]$")) {
            if(currentEntry.length < MAX_LENGTH) {
                updateCurrentEntry(prev => `${prev}${value}`.replace(/^0*(\d)(.*)/, "$1$2"));
            }
        }
    }

    const handleOperClick = oper => {
        switch(oper) {
            case OPERATION.CLR:
                clearAll();
            break;
            case OPERATION.CLR_ENTRY:
                clearEntry();
            break;
            case OPERATION.BCK_SPACE:
                const updatedEntry = currentEntry.slice(0, -1).replace(/\.$/, "") || "0";
                updateCurrentEntry(updatedEntry);
                if(updatedEntry === "0") {
                    clearEntry(true);
                }
            break;
            case OPERATION.TGL_SIGN:
                setCurrentSign(curr => (currentEntry !== "0" && curr === "+") ? "-" : "+");
            break;
            case OPERATION.FRAC:
                if(currentEntry.indexOf('.') < 0) {
                    updateCurrentEntry(prev => `${prev}.`);
                }
            break;
            
            case OPERATION.ADD:
            case OPERATION.SUB:
            case OPERATION.MULT:
            case OPERATION.DIV:
            case OPERATION.EQUAL:
                processNewOperation(oper);
            break;

            default:
                console.error("Operation not supported yet: " + oper);
        }
    }

    const processNewOperation = oper => {
        if(getPreviousValue() === null) {
            pushEntryToHistory(null);
        } else {
            if(currentOper) {
                if(isTypingEntry) {
                    calculateCurrentOperation();
                }
            } else {
                if(oper === OPERATION.EQUAL && (history||[]).length === 1) {
                    replaceLastHistory(null);
                }
            }            
        }
        setCurrentOper(oper === OPERATION.EQUAL ? null : oper);
    }

    const pushEntryToHistory = oper => {
        const value = getCurrentValue();
        setHistory(hist => (hist||[]).concat([ { value, oper }]))
        clearEntry();
    }

    const replaceLastHistory = oper => {
        const value = getCurrentValue();
        setHistory(hist => [...hist.slice(0, hist.length-1), { value, oper }])
        clearEntry();
    }

    const updateCurrentEntry = entry => {
        setCurrentEntry(entry);
        setTypingEntry(true);
    }

    const displayEntryValue = !isTypingEntry && getPreviousValue() ?  `${getPreviousValue()}` : `${currentSign !== "+" ? currentSign : ''}${currentEntry}`;

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
                        operation={currentOper}
                        value={displayEntryValue}
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
