import { useState, useEffect, useCallback } from 'react'
import socket from '../../utils/socket'
import styles from './styles.module.sass'

const Login = () => {
    const [input, setInput] = useState('')
    const [userState, setUserState] = useState({
        user: null,
        isConnected: socket.connected,
        lastMessage: null,
    })

    useEffect(() => {
        socket.on('connect', () => {
            setUserState({ ...userState, isConnected: true })
        })
        socket.on('disconnect', () => {
            setUserState({ ...userState, isConnected: false })
        })
        socket.on('message', (data) => {
            console.log('Received message: ', data)
            setUserState({ ...userState, lastMessage: data })
        })
        socket.on('connect_error', (err) => {
            console.error('Connection error: ', err)
            setUserState({ ...userState, isConnected: false })
        })
        // cleanup
        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('message')
            socket.off('connect_error')
        }
    }, [userState])

    /**
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const onChange = useCallback((e) => {
        setInput(e.target.value)
    }, [])

    /**
     *
     * @param {React.FormEventHandler<HTMLFormElement>} e
     */
    const onSubmit = useCallback(
        (e) => {
            try {
                e.preventDefault()
                if (!input) {
                    return
                }
                socket.auth = { username: input }
                socket.connect()
                console.info('Have called .connect()')
            } catch (err) {
                alert(`ERROR: ${err}`)
            }
        },
        [input]
    )

    return (
        <>
            <form
                className={`pure-form pure-form-stacked ${styles.form}`}
                onSubmit={onSubmit}
            >
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        name='username'
                        type='text'
                        placeholder='John Doe'
                        onChange={onChange}
                    />
                </div>
                <button
                    className='pure-button pure-button-primary'
                    type='submit'
                >
                    Submit
                </button>
            </form>
            <p>username: {input}</p>
            <p>{JSON.stringify(userState, null, 2)}</p>
        </>
    )
}

export default Login
