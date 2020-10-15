import React from 'react'
import "./LoginPage.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function LoginPage() {
    return (
        <div className="login_page">
            <h1>Dobrodošli na stranicu za predstavljanje zdravstvenih radova</h1>
            <h2>Prijavite se upisom svojih podataka</h2>
            <form className="login_form">
                <TextField label="Ime" />
                <TextField label="Prezime" />
                <TextField label="Naziv institucije" />
                <TextField label="Adresa" />
                <TextField label="E-mail" />
                <TextField label="Autori rada" />
                <TextField label="Osoba za kontakt" />
                <TextField label="Sekcija u kojoj želite biti" />
            </form>
            <Button variant="contained" color="primary">
                Registriraj me!
            </Button>
        </div>
    )
}

export default LoginPage
