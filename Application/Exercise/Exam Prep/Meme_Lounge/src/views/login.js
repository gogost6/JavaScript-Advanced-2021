import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api.js'
import { notify } from '../notification.js';

function loginTemplate(onSubmit) {
    return html`
    <section id="login">
        <form @submit="${onSubmit}" id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `;
}

export async function loginPage(ctx) {
    console.log('login-page created');
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const pass = form.get('password');

        try {
            if (email == '' || pass == '') {
                throw new Error('Missing fields!');
            } else {
                await login(email.trim(), pass.trim());
    
                ctx.setUserNav();
                ctx.page.redirect('/all-memes');
            }  
        } catch(err) {
            notify(err.message);
        } 
    }
}