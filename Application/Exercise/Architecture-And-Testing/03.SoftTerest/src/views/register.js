import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js';

function registerTemplate(onSubmit) {
    return html`
   <div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit = "${onSubmit}" class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            </div>
            <div class="form-label-group">
                <label for="inputEmail">Email</label>
                <input type="text" id="inputEmail" name="email" class="form-control" placeholder="Email" required=""
                    autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control"
                    placeholder="Password" required="">
            </div>
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> You have account? Then just
                    <a href="/login">Sign-In</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`
}

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const pass = form.get('password');
        const rePass = form.get('repeatPassword');

        if (pass !== rePass) {
            alert('Password and repeat don\'t match!')
        } else {
            await register(email.trim(), pass.trim());
            alert('Successfull registration!');
            ctx.setupUserNav();
            ctx.page.redirect('/');
        }
    }
}