import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/api.js'

import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

const main = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/', renderMiddleware, homePage);
page('/home', renderMiddleware, homePage);
page('/dashboard', renderMiddleware, dashboardPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/create', renderMiddleware, createPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);

setupUserNav();
page.start();

function renderMiddleware(ctx, next) {
    ctx.setupUserNav = setupUserNav;
    ctx.render = (context) => render(context, main);
    next();
}

function setupUserNav() {
    const user = sessionStorage.getItem('userId');
    if (user != null) {
        [...document.querySelectorAll('a.nav-link.user')].forEach(a => a.style.display = "block");
        [...document.querySelectorAll('a.nav-link.guest')].forEach(a => a.style.display = "none");
    } else {
        [...document.querySelectorAll('a.nav-link.user')].forEach(a => a.style.display = "none");
        [...document.querySelectorAll('a.nav-link.guest')].forEach(a => a.style.display = "block");
    }
}

async function onLogout() {
    await logout();
    setupUserNav();
    page.redirect('/');
}