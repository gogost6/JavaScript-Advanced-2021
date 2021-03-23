import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/api.js";

function loginTemplate(onSubmit) {
    return html`<header>
    <h1><a href="/">Furniture Store</a></h1>
    <nav>
        <a id="catalogLink" href="/">Dashboard</a>
        <div id="guest">
            <a id="loginLink" href="/login" class="active">Login</a>
            <a id="registerLink" href="/register">Register</a>
        </div>
    </nav>
</header>
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`
}

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const pass = form.get('password');

        if (email != '') {
            document.getElementById('email').className = "form-control is-valid"
        } else {
            document.getElementById('email').className = "form-control is-invalid"
        }

        if (pass != '') {
            document.getElementById('password').className = "form-control is-valid"
        } else {
            document.getElementById('password').className = "form-control is-invalid"
        }

        await login(email.trim(), pass.trim());
        ctx.page.redirect('/');
    }
}