import { ButtonContainer, ButtonRow, ButtonCol } from './styles.js';
import CalcButton from '../calcButton/calcButton.js';

import { OPERATION } from '../../core/enums.js';

const CalcButtonPanel = (props) => {
    const { darkMode, onClickNumber, onClickOperation } = props;

    return (
        <ButtonContainer id="buttonContainerId">
            <ButtonCol colWidth="75%">
                <ButtonRow>
                    <CalcButton label="C" onClick={() => onClickOperation(OPERATION.CLR)} darkMode={darkMode} />
                    <CalcButton label="CE" onClick={() => onClickOperation(OPERATION.CLR_ENTRY)} darkMode={darkMode} />
                    <CalcButton label="&larr;" onClick={() => onClickOperation(OPERATION.BCK_SPACE)} darkMode={darkMode} />
                </ButtonRow>
                <ButtonRow>
                    <CalcButton label="7" onClick={() => onClickNumber(7)} darkMode={darkMode} />
                    <CalcButton label="8" onClick={() => onClickNumber(8)} darkMode={darkMode} />
                    <CalcButton label="9" onClick={() => onClickNumber(9)} darkMode={darkMode} />
                </ButtonRow>
                <ButtonRow>
                    <CalcButton label="4" onClick={() => onClickNumber(4)} darkMode={darkMode} />
                    <CalcButton label="5" onClick={() => onClickNumber(5)} darkMode={darkMode}  />
                    <CalcButton label="6" onClick={() => onClickNumber(6)} darkMode={darkMode}  />
                </ButtonRow>
                <ButtonRow>
                    <CalcButton label="1" onClick={() => onClickNumber(1)} darkMode={darkMode}  />
                    <CalcButton label="2" onClick={() => onClickNumber(2)} darkMode={darkMode}  />
                    <CalcButton label="3" onClick={() => onClickNumber(3)} darkMode={darkMode}  />
                </ButtonRow>
                <ButtonRow>
                    <CalcButton label="+/-" onClick={() => onClickOperation(OPERATION.TGL_SIGN)} darkMode={darkMode}  />
                    <CalcButton label="0" onClick={() => onClickNumber(0)} darkMode={darkMode}  />
                    <CalcButton label="." onClick={() => onClickOperation(OPERATION.FRAC)} darkMode={darkMode}  />
                </ButtonRow>
            </ButtonCol>
            <ButtonCol colWidth="25%">
                <CalcButton label="/" onClick={() => onClickOperation(OPERATION.DIV)} darkMode={darkMode}  />
                <CalcButton label="*" onClick={() => onClickOperation(OPERATION.MULT)} darkMode={darkMode}  />
                <CalcButton label="-" onClick={() => onClickOperation(OPERATION.SUB)} darkMode={darkMode}  />
                <CalcButton label="+" onClick={() => onClickOperation(OPERATION.ADD)} darkMode={darkMode}  />
                <CalcButton label="=" onClick={() => onClickOperation(OPERATION.EQUAL)} darkMode={darkMode}  />
            </ButtonCol>
        </ButtonContainer>

    );
}
export default CalcButtonPanel;
