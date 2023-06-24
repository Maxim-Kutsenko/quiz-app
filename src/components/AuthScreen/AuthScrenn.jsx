import { useState, useRef } from 'react'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'
import { Modal } from '../Modal/Modal'
import { setAuthorized } from '../../redux/rootSlice'
import eyeShow from '../../icons/eye-show.svg'
import eyeHide from '../../icons/eye-hide.svg'
import { CSSTransition } from 'react-transition-group'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { app } from './firebaseConfig'
import { useDispatch } from 'react-redux'
import './authScreen.scss'

export const AuthScrenn = () => {

    const dispatch = useDispatch()
    const formRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState(null)
    const [activeTab, setActiveTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [stayLoggined, setStayLoggined] = useState(false)

    const buttons = [
        { id: 0, text: 'Registration' },
        { id: 1, text: 'Login' }
    ]

    function registrationHandler(event) {
        event.preventDefault()

        const emailValue = event.target.elements.email.value
        const passwordValue = event.target.elements.password.value
        const confirmPasswordValue = event.target.elements.confirmPassword.value

        if (passwordValue !== confirmPasswordValue) {
            setStatus('password must be equal')
        } else {
            setLoading(true)
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setLoading(false)
                    console.log(user);
                    setShowModal(true)
                    setActiveTab(1)
                    setStatus(null)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    setStatus(errorMessage)
                    setLoading(false)
                });
        }
    }
    function authorizationHandler(event) {
        event.preventDefault()
        setLoading(true)
        const emailValue = event.target.elements.email.value
        const passwordlValue = event.target.elements.password.value
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, emailValue, passwordlValue)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false)
                console.log(userCredential);
                setStatus('Sucsecc')
                dispatch(setAuthorized())
                if (stayLoggined) {
                    localStorage.setItem('loggined', true)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                setStatus(errorMessage)
                console.log(errorCode);
                console.log(errorMessage);
            });
    }
    return (
        <>
            <header className='header'>
                <Container>
                    <div className="header__wrap">
                        {buttons.map((item) => {
                            return (
                                <Button
                                    className={`btn ${activeTab === item.id ? 'btn--active' : ''}`}
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id)
                                        formRef.current.reset()
                                    }}
                                >{item.text}
                                </Button>
                            )
                        })}
                    </div>

                </Container>
            </header>

            <Container>
                <Title>{activeTab === 0 ? 'Registration' : 'Login'} </Title>
                <form
                    ref={formRef}
                    className='form'
                    onSubmit={activeTab === 0 ? registrationHandler : authorizationHandler}
                >
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='form__input btn'
                        placeholder='Email'
                        required
                    />
                    <div className='form__input-wrap'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className='form__input btn'
                            placeholder='Password'
                            style={{ width: '100%' }}
                            required
                        />
                        <img src={showPassword ? eyeHide : eyeShow}
                            alt="Show password"
                            className='icon'
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {activeTab === 0 ? (
                        <div className='form__input-wrap'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                className='form__input btn'
                                placeholder='Confirm Password'
                                style={{ width: '100%' }}
                                required
                            />
                            <img src={showPassword ? eyeHide : eyeShow}
                                alt="Show password"
                                className='icon'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    ) : null}
                    {activeTab === 1 ? (
                        <label htmlFor="checkbox">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                onChange={() => setStayLoggined(!stayLoggined)}
                            />
                            Stay loggined
                        </label>
                    ) : null}
                    <Button
                        type='submit'
                        disabled={false}
                        className={'btn'}
                    >
                        {activeTab === 0 ? 'Register' : 'Login'}
                    </Button>
                    {status && <div className="status">{status}</div>}
                </form>
            </Container>
            {loading && <Loader />}
            <CSSTransition
                in={showModal}
                classNames="fade"
                timeout={500}
                unmountOnExit
            >
                <Modal
                    text={'User successfully created, now log in'}
                    onConfirm={() => setShowModal(false)}
                />
            </CSSTransition>
        </>

    )
}
