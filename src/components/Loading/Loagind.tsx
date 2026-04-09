import Modal from "../Modal/Modal";
import * as S from "./styles";

function Loading() {

    return (
        <Modal>
            <S.SpinnerWrapper>
                <S.CircularSpinner />
                <S.LoadingMessage>Loading</S.LoadingMessage>
            </S.SpinnerWrapper>
        </Modal>
    );
}

export default Loading;