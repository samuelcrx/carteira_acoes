import React, {useState} from 'react'

import {Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'

import {Link} from 'react-router-dom'

import './Cadastro.css'

import './Login.css'

const Logo = require('../assets/logo.jpg')

const Cadastro = props => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
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
                <div className='Logo'>
                    <img src={Logo} alt="Logo" className='imagemLogo' />
                </div>
                <form className='formulario' onSubmit={() => onSubmit()}>
                    <FormGroup className='FormNome' controlId='nome' bsSize='large'>
                        <FormLabel className='TextLogin'>Nome</FormLabel >
                        <FormControl className='InputLogin' autoFocus type='email' placeholder='Digite seu Nome' value={nome} onChange={event => setNome(event.target.value)}/>
                    </FormGroup>
                    <FormGroup className='FormLogin' controlId='login' bsSize='large'>
                        <FormLabel className='TextLogin'>Login</FormLabel >
                        <FormControl className='InputLogin' autoFocus type='email' placeholder='Digite seu E-mail' value={login} onChange={event => setLogin(event.target.value)}/>
                    </FormGroup>
                    <FormGroup controlId='password' bsSize='large'>
                        <FormLabel className='TextPass' >Senha</FormLabel >
                        <FormControl className='InputPass' autoFocus type='password' placeholder='Digite sua Senha' value={password} onChange={event => setPassword(event.target.value)}/>
                    </FormGroup>
                    <Button className={validateForm() ? 'ButtonLogin' : 'ButtonLoginDisabled'} block bsSize='large' disabled={!validateForm()} type='submit'>Cadastrar</Button>
                    <Link to='/'>
                    <p className={singinTouched? 'TextSingin TextSinginTouched' : 'TextSingin'} onMouseUp={() => setSinginTouched(false)} onMouseDown={() => setSinginTouched(true)} >Login</p>
                    </Link>
                </form>
            </div>
        </div>
    )

}

export default Cadastro