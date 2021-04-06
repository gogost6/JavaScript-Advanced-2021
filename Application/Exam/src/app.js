import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api.js'

import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { cataloguePage } from './views/catalogue.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.querySelector('#container');
document.querySelector('a.logoutBtn').addEventListener('click', onLogout);

page('/', renderMiddleware, homePage);
page('/home', renderMiddleware, homePage);
page('/search', renderMiddleware, searchPage);
page('/create', renderMiddleware, createPage);
page('/catalogue', renderMiddleware, cataloguePage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
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
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    setUserNav();
    page.redirect('/');
}