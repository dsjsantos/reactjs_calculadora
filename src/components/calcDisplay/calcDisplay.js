import { forwardRef, useImperativeHandle, useRef } from 'react';
import { CurrentOper, DisplayContainer, DisplayCurrentValue,
         HistoryContainer, HistoryTopSpace, HistoryContent, HistoryRow, HistOper } from './styles.js';

const CalcDisplay = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            scrollToEndOfHistory: doScrollToEndOfHistory
        }
    })

    const { darkMode, operation, value } = props;
    const history = props.history || [];
    const endOfHistory = useRef(null);

    const doScrollToEndOfHistory = () => endOfHistory.current.scrollIntoView();

    const getDecimalSeparator = () => {
        const n = 1.1;
        return n.toLocaleString().substring(1, 2);
    }

    const formatValueToDisplay = value => `${(value || "0")}`.replace(".", getDecimalSeparator())

    return (
        <DisplayContainer id="displayContentId" darkMode={darkMode}>
            <HistoryContainer id="historyConteinerId">
                <HistoryTopSpace darkMode={darkMode} />
                <HistoryContent id="historyContentId">
                    { history.map((h, indx) => 
                        <HistoryRow key={`historyId_${indx}`}>
                            { h.oper &&
                            <HistOper>({h.oper})</HistOper> }
                            <span>{h.value}</span>
                            { (operation && indx === (history.length-1)) &&
                            <CurrentOper>{operation}</CurrentOper> }
                        </HistoryRow>) }
                    <div ref={endOfHistory}></div>
                </HistoryContent>
            </HistoryContainer>
            <DisplayCurrentValue id="displayCurrentValueId">
                {formatValueToDisplay(value)}
            </DisplayCurrentValue>
        </DisplayContainer>
    );
});

export default CalcDisplay;
