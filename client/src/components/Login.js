import React, {useState} from 'react'

import {Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'

import './Login.css'

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [singinTouched, setSinginTouched] = useState(false)

    const validateForm = () => {
        return login.length > 0 && password.length > 0
    }

    const onSubmit = () => {
        alert(`login: ${login}\npassword: ${password}`)
    }

    return(
        <div className='Container'>
            <div className='SubContainer'>
                <div className='Logo'/>
                <form onSubmit={() => onSubmit()}>
                    <FormGroup className='FormLogin' controlId='login' bsSize='large'>
                        <FormLabel className='TextLogin'>Login</FormLabel >
                        <FormControl className='InputLogin' autoFocus type='email' value={login} onChange={event => setLogin(event.target.value)}/>
                    </FormGroup>
                    <FormGroup controlId='password' bsSize='large'>
                        <FormLabel className='TextPass' >Senha</FormLabel >
                        <FormControl className='InputPass' autoFocus type='password' value={password} onChange={event => setPassword(event.target.value)}/>
                    </FormGroup>
                    <Button className={validateForm() ? 'ButtonLogin' : 'ButtonLoginDisabled'} block bsSize='large' disabled={!validateForm()} type='submit'>Entrar</Button>
                    <p className={singinTouched? 'TextSingin TextSinginTouched' : 'TextSingin'} onMouseUp={() => setSinginTouched(false)} onMouseDown={() => setSinginTouched(true)} onClick={() => alert('going to singin screen')}>Criar Conta</p>
                    {/* <p className='TextSingin' onClick={() => alert('going to singin screen')}>Criar Conta</p> */}
                </form>
                {/* <p className='TextLogin'>Login</p>
                <input className='InputLogin'/>
                <p className='TextPass'>Senha</p>
                <input className='InputPass'/>
                <button className='ButtonLogin'>Entrar</button>
                <p onClick={() => alert('ueeeeeee')} className='TextSingin'>Criar Conta</p> */}
            </div>
        </div>
    )

}

export default Login