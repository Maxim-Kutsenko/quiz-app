import { useState } from 'react'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'
import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'
import { Modal } from '../Modal/Modal'
import { setAuthorized } from '../../redux/rootSlice'
import eyeShow from '../../icons/eye-show.svg'
import eyeHide from '../../icons/eye-hide.svg'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { app } from './firebaseConfig'
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import './authScreen.scss'

export const AuthScrenn = () => {

    const dispatch = useDispatch()

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
        setLoading(true)
        const emailValue = event.target.elements.email.value
        const passwordlValue = event.target.elements.password.value
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, emailValue, passwordlValue)
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
                                    onClick={() => setActiveTab(item.id)}
                                >{item.text}
                                </Button>
                            )
                        })}
                    </div>

                </Container>
            </header>
            {activeTab === 0 && (
                <Container>
                    <Title>Registration </Title>
                    <form className='form' onSubmit={registrationHandler}>
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
                        <Button type='submit' disabled={false} className={'btn'}>Register</Button>
                        {status && <div className="status">{status}</div>}

                    </form>
                </Container>
            )}
            {activeTab === 1 && (
                <Container>
                    <Title>Login </Title>
                    <form className='form' onSubmit={authorizationHandler}>
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
                        <label htmlFor="checkbox">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                onChange={() => setStayLoggined(!stayLoggined)}
                            />
                            Stay loggined
                        </label>
                        <Button type='submit' disabled={false} className={'btn'}>Login</Button>
                        {status && <div className="status">{status}</div>}

                    </form>
                </Container>
            )}

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
