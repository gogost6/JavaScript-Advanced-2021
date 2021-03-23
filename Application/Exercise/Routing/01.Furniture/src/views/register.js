import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js'
function registerTemplate(onSubmit, emailBool, passBool, rePassBool) {
    return html`<header>
    <h1><a href="/">Furniture Store</a></h1>
    <nav>
        <a id="catalogLink" href="/">Dashboard</a>
        <div id="guest">
            <a id="loginLink" href="/login">Login</a>
            <a id="registerLink" href="/register" class="active">Register</a>
        </div>
    </nav>
</header>

<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit="${onSubmit}">
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`
}


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const pass = form.get('password');
        const rePass = form.get('rePass');

        if (email != '') {
            document.getElementById('email').className = "form-control is-valid"
        } else {
            document.getElementById('email').className = "form-control is-invalid"
        }

        if (pass == '') {
            document.getElementById('password').className = "form-control is-invalid"
        } else {
            document.getElementById('password').className = "form-control is-valid"
        }

        if (rePass == '') {
            document.getElementById('rePass').className = "form-control is-invalid"
        } else {
            document.getElementById('rePass').className = "form-control is-valid"
        }

        if (pass !== rePass) {
            document.getElementById('password').className = "form-control is-invalid"
            document.getElementById('rePass').className = "form-control is-invalid"
            alert('Password and repeat don\'t match!')
        } else {
            await register(email.trim(), pass.trim());
            alert('Successfull registration!');
            ctx.page.redirect('/');
        }
    }
}