import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myFurniturePage } from './views/myFurniture.js';
import { registerPage } from './views/register.js';


const main = document.querySelector('.container')

page('/', renderMiddleware, dashboardPage);
page('/dashboard', renderMiddleware, dashboardPage);
page('/my-furniture', renderMiddleware, myFurniturePage);
page('/details/:id', renderMiddleware, detailsPage);
page('/create', renderMiddleware, createPage);
page('/edit/:id', renderMiddleware, editPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);

page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (context) => render(context, main);
    next();
}