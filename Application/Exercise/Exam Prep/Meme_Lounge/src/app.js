import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api.js'

import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { allMemesPage } from './views/all-memes.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { userPage } from './views/user-page.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

const main = document.querySelector('.container');
document.querySelector('a#logoutBtn').addEventListener('click', onLogout);

page('/', renderMiddleware, homePage);
page('/home', renderMiddleware, homePage);
page('/create', renderMiddleware, createPage);
page('/all-memes', renderMiddleware, allMemesPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/user-page', renderMiddleware, userPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);

setUserNav();
page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (context) => render(context, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    if (sessionStorage.getItem('userId') != null) {
        document.querySelector('div.profile span').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        document.querySelector('nav div.user').style.display = 'block';
        document.querySelector('nav div.guest').style.display = 'none';
    } else {
        document.querySelector('nav div.user').style.display = 'none';
        document.querySelector('nav div.guest').style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    setUserNav();
    page.redirect('/');
}