const valid = (name, email, password, confirmPassword) => {
    if (!name || !email || !password)
        return 'Merci de vérifier tous les champs.'

    if (!validateEmail(email))
        return 'Email invalide.'

    if (password.length < 6)
        return 'Le mot de passe doit être supérieur à 6 caractères.'

    if (password !== confirmPassword)
        return 'Le mot de passe et la confirmation ne sont pas conformes.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid;

