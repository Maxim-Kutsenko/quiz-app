import { Button } from '../Button/Button'
import styled from 'styled-components'

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `
const ModalInner = styled.div`
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    color: #000;
    width: 300px;
`
const ModalTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`
const ModalWrap = styled.div`
    display: flex;
`

export const Modal = ({ text, onConfirm, onCancel, buttonRequired }) => {
    return (
        <Overlay>
            <ModalInner>
                <ModalTitle>{text}</ModalTitle>
                <ModalWrap>
                    <Button
                        center
                        modal
                        onClick={onConfirm}
                    >
                        Ok
                    </Button>
                    {buttonRequired &&
                        <Button
                            center
                            modal
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>}
                </ModalWrap>
            </ModalInner>
        </Overlay>
    )
}
