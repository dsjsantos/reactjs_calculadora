import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DisplayContainer, DisplayCurrentValue,
         HistoryContainer, HistoryTopSpace, HistoryContent, HistoryRow, HistOper } from './styles.js';

const CalcDisplay = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            scrollToEndOfHistory: doScrollToEndOfHistory
        }
    })

    const { darkMode, history, value } = props;
    const endOfHistory = useRef(null);

    const doScrollToEndOfHistory = () => endOfHistory.current.scrollIntoView();

    return (
        <DisplayContainer id="displayContentId" darkMode={darkMode}>
            <HistoryContainer id="historyConteinerId">
                <HistoryTopSpace darkMode={darkMode} />
                <HistoryContent id="historyContentId">
                    { (history || []).map((h, indx) => 
                        <HistoryRow key={`historyId_${indx}`}>
                            { h.oper &&
                            <HistOper>({h.oper})</HistOper> }
                            <span>{h.value}</span>
                        </HistoryRow>) }
                    <div ref={endOfHistory}></div>
                </HistoryContent>
            </HistoryContainer>
            <DisplayCurrentValue id="displayCurrentValueId">
                {value || "0"}
            </DisplayCurrentValue>
        </DisplayContainer>
    );
});

export default CalcDisplay;
