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

const ARITIMETIC_OPERS = [OPERATION.ADD, OPERATION.SUB, OPERATION.MULT, OPERATION.DIV];
const MAX_LENGTH = 15;

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
    const [ currentArithmeticOper, setCurrentArithmeticOper ] = useState(null);
    const [ isTypingEntry, setTypingEntry ] = useState(true);
    const themeTitle = darkMode ? 'Light Mode' : 'Dark Mode';
    const themeImage = darkMode ? imgLight : imgDark;
    
    const calculateCurrentOperation = () => {
        let result;
        const valueA = getPreviousValue();
        const valueB = getCurrentValue();
        const oper = Number.isNaN(valueA) || Number.isNaN(valueB) ? null : currentArithmeticOper;

        switch(oper) {
            case OPERATION.ADD:
                result = valueA + valueB;
            break;
            case OPERATION.SUB:
                result = valueA - valueB;
            break;
            case OPERATION.MULT:
                result = valueA * valueB;
            break;
            case OPERATION.DIV:
                result = Number.isFinite(valueA / valueB) ? (valueA / valueB) : null;
            break;
            default:
                result = null;
        }       
        pushEntryToHistory(oper);
        if(result === null) {
            clearEntry(false);
            pushToHistory(OPERATION.EQUAL, null, true);
            console.error(`Error calculating arithmetic operation (${valueA} ${currentArithmeticOper} ${valueB}).`);
        } else {
            pushToHistory(OPERATION.EQUAL, result);
        }
    }

    const clearAll = () => {
        clearEntry();
        clearHistory();
        setCurrentArithmeticOper(null);
    }

    const clearEntry = (typing) => {
        setCurrentEntry("0");
        setCurrentSign("+");
        setTypingEntry(typing === false ? false : true);
    }

    const clearHistory = () => setHistory([]);

    const getCurrentValue = () => parseFloat(`${currentSign}${currentEntry}`) || 0;

    const getLastHistory = () => ((history||[]).length ? history[history.length-1] : null) || {};

    const getPreviousValue = () => {
        const lastHist = getLastHistory();
        return lastHist.value !== undefined ? lastHist.value : null;
    }

    const handleNumberClick = value => {
        if((`${value}`).match("^[0-9]$")) {
            if(currentEntry.length < MAX_LENGTH) {
                updateCurrentEntry(prev => `${prev}${value}`.replace(/^0*(\d)(.*)/, "$1$2"));
                scrollToEndOfHistory();
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
                    clearEntry();
                }
            break;
            case OPERATION.TGL_SIGN:
                const lastHistory = getLastHistory();
                if(!isTypingEntry && lastHistory.oper === OPERATION.EQUAL && lastHistory.value) {
                    const updatedEntry = `${Math.abs(lastHistory.value)}`;
                    updateCurrentEntry(updatedEntry);
                    setCurrentSign(lastHistory.value < 0 ? "+" : "-");
                } else {
                    setCurrentSign(curr => (currentEntry !== "0" && curr === "+") ? "-" : "+");
                }
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
        if(getPreviousValue() === null || (getLastHistory().oper === OPERATION.EQUAL && isTypingEntry && !currentArithmeticOper)) {
            pushEntryToHistory(null);
        } else {
            if(currentArithmeticOper) {
                if(isTypingEntry) {
                    calculateCurrentOperation();
                }
            } else {
                if(oper === OPERATION.EQUAL && (history||[]).length === 1) {
                    replaceLastHistory(null);
                }
            }            
        }
        updateCurrentArithmeticOper(oper === OPERATION.EQUAL ? null : oper);
        scrollToEndOfHistory();
    }

    const pushEntryToHistory = oper => {
        const value = getCurrentValue();
        pushToHistory(oper, value, false);
        clearEntry(false);
    }

    const pushToHistory = (oper, value, error) => {
        setHistory(hist => (hist||[]).concat([ { value, oper, error }]))
    }

    const replaceLastHistory = oper => {
        const value = getCurrentValue();
        setHistory(hist => [...hist.slice(0, hist.length-1), { value, oper }])
        clearEntry(false);
    }

    const scrollToEndOfHistory = () => displayRef?.current?.scrollToEndOfHistory();

    const updateCurrentEntry = entry => {
        setCurrentEntry(entry);
        setTypingEntry(true);
    }

    const updateCurrentArithmeticOper = oper => {
        const newOper = oper && ARITIMETIC_OPERS.includes(oper) ? oper : null;
        setCurrentArithmeticOper(newOper);
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
                        operation={currentArithmeticOper}
                        value={displayEntryValue}
                    />
                    <CalcButtonPanel 
                        id="calcButtonPanelId"
                        darkMode={darkMode}
                        onClickNumber={handleNumberClick}
                        onClickOperation={handleOperClick}
                    />
                </CalcWrapper>

            </Container>
        </StyleSheetManager>
    );
}
export default App;
