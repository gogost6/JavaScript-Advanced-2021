import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api.js'

import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { allCarsPage } from './views/all-cars.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myCarsPage } from './views/my-cars.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


const main = document.querySelector('div#container');
document.querySelector('a#logoutBtn').addEventListener('click', onLogout);

page('/', renderMiddleware, homePage);
page('/home', renderMiddleware, homePage);
page('/create', renderMiddleware, createPage);
page('/all-cars', renderMiddleware, allCarsPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/my-cars', renderMiddleware, myCarsPage);
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
        document.querySelector('div#profile a').textContent = `Welcome ${sessionStorage.getItem('username')}`;
        document.querySelector('nav div#profile').style.display = 'block';
        document.querySelector('nav div#guest').style.display = 'none';
    } else {
        document.querySelector('nav div#profile').style.display = 'none';
        document.querySelector('nav div#guest').style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    setUserNav();
    page.redirect('/');
}