import { ButtonWrapper } from './styles.js';

const CalcButton = (props) => {
    const { label, onClick, darkMode } = props;
    return (
        <ButtonWrapper onClick={onClick} darkMode={darkMode}>
            {label}
        </ButtonWrapper>
    );
}
export default CalcButton;
