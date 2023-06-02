import { Button } from '../Button/Button'
import '../../scss/index.scss'

export const Modal = ({ text, onConfirm, onCancel, buttonRequired }) => {
    return (
        <div className='overlay'>
            <div className="modal-inner">
                <h3 className='modal-title'>{text}</h3>
                <div className="modal-wrap">
                    <Button
                        className={'btn btn--center btn--modal'}
                        text={'ОК'}
                        onClick={onConfirm}
                    />
                    {buttonRequired &&
                        <Button
                            className={'btn btn--center btn--modal'}
                            text={'Відміна'}
                            onClick={onCancel}
                        />}
                </div>

            </div>
        </div>
    )
}
