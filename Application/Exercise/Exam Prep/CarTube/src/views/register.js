import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api.js';

function registerTemplate(onSubmit) {
    return html`
    <section id="register">
        <div class="container">
            <form @submit="${onSubmit}" id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
    `;
}

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const username = form.get('username');
        const password = form.get('password');
        const repeatPass = form.get('repeatPass');

        if (password !== repeatPass) {
            alert('Password and repeat don\'t match!');
        } else if(username == '' || password == '') {
            alert('Empty inputs!');
        } else {
            await register(username.trim(), password.trim());
            alert('Successfull registration!');
            ctx.setUserNav();
            ctx.page.redirect('/all-memes');
        }
    }
}