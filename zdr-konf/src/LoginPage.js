import React from 'react'
import "./LoginPage.css"

function LoginPage() {
    return (
        <div className="login_page">
            <h1>Dobrodošli na stranicu za predstavljanje zdravstvenih radova</h1>
            <h2>Prijavite se upisom svojih podataka</h2>
            <form className="login_form">
                <input placeholder="Ime" type="text"/>
                <input placeholder="Prezime" type="text"/>
                <input placeholder="Naziv institucije ili poduzeća" type="text"/>
                <input placeholder="Adresa" type="text"/>
                <input placeholder="e-mail" type="text"/>
                <input placeholder="Autori rada" type="text"/>
                <input placeholder="Osoba za kontakt" type="text"/>
                <input placeholder="Sekcija u kojoj želite sudjelovati" type="text"/>
            </form>
        </div>
    )
}

export default LoginPage
