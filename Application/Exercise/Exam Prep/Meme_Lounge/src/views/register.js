import page from '../../node_modules/page/page.mjs';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api.js'
import { notify } from '../notification.js';
function registerTemplate(onSubmit) {
    return html`
    <section id="register">
        <form @submit="${onSubmit}" id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `;
}

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const username = form.get('username');
        const email = form.get('email');
        const pass = form.get('password');
        const gender = form.get('gender');
        const rePass = form.get('repeatPass');

        try {
            if (pass !== rePass) {
                throw new Error('Password and repeat don\'t match!')
            } else if(email == '' || pass == '' || gender == '' || rePass == '') {
                throw new Error('Empty inputs!')
            } else {
                await register(email.trim(), pass.trim(), username.trim() , gender);
                alert('Successfull registration!');
                ctx.setUserNav();
                ctx.page.redirect('/all-memes');
            }
        } catch(err) {
            notify(err.message)
        }
    }
}