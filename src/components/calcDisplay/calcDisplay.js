import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import { CopiedToClipBoard, CurrentOper, DisplayContainer, DisplayCurrentValue,
         HistoryContainer, HistoryTopSpace, HistoryContent, HistoryRow, HistOper, HistValue } from './styles.js';

const COPY_TO_CLIPBOARD = "Copy to clipboard";

const CalcDisplay = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            scrollToEndOfHistory: doScrollToEndOfHistory
        }
    })

    const { darkMode, history, error, operation, value } = props;
    const endOfHistory = useRef(null);
    const timerCopied = useRef(null);
    const [ displayHistory, setDisplayHistory ] = useState([]);
    const [ showCopied, setShowCopied ] = useState(false);

    const copyToClipboard = val => {
        navigator.clipboard.writeText(val);
        setShowCopied(true);
        timerCopied.current = setTimeout(() => hideCopied(), 1000);
    }

    const doScrollToEndOfHistory = () => endOfHistory.current.scrollIntoView();

    const formatValueToDisplay = value => `${(value || "0")}`.replace(".", getDecimalSeparator())

    const getDecimalSeparator = () => {
        const n = 1.1;
        return n.toLocaleString().substring(1, 2);
    }

    const hideCopied = () => {
        clearTimeout(timerCopied.current);
        setShowCopied(false);
    }

    useEffect(() => {
        setDisplayHistory(history || []);
        setTimeout(() => doScrollToEndOfHistory(), 25);
    }, [history]);

    return (
        <DisplayContainer id="displayContentId" darkMode={darkMode}>
            <CopiedToClipBoard id="copiedMessageId" className={showCopied ? 'visible' : ''}>Value copied to clipboard.</CopiedToClipBoard>
            <HistoryContainer id="historyConteinerId">
                <HistoryTopSpace darkMode={darkMode} />
                <HistoryContent id="historyContentId">
                    { displayHistory.map((h, indx) => {
                        const formatedValue = formatValueToDisplay(h.value);
                        return(
                            <HistoryRow key={`historyId_${indx}`}>
                                { h.error ? 
                                <span>ERR</span> : 
                                <>
                                    { h.oper &&
                                    <HistOper>({h.oper})</HistOper> }
                                    <HistValue title={COPY_TO_CLIPBOARD} onClick={() => copyToClipboard(formatedValue)}>{formatedValue}</HistValue>
                                    { (operation && indx === (history.length-1)) &&
                                    <CurrentOper>{operation}</CurrentOper> }
                                </> }
                            </HistoryRow>
                        );
                    })}
                    <div ref={endOfHistory}></div>
                </HistoryContent>
            </HistoryContainer>
            <DisplayCurrentValue id="displayCurrentValueId">
                { error ? 'ERR' : formatValueToDisplay(value) }
            </DisplayCurrentValue>
        </DisplayContainer>
    );
});

export default CalcDisplay;
