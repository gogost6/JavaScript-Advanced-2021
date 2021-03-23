import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { request } from './data.js';
import { template } from './template.js'

async function start() {
   const data = await request('http://localhost:3030/jsonstore/advanced/table', {method: 'get'});
   
   const container = document.querySelector('tbody');
   const result = template(Object.values(data));

   render(result, container)
}

start()

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick(e) {
      e.preventDefault()
      removeClassName(Array.from(document.querySelectorAll('tr')));
      if(document.getElementById('searchField').value != '') {
         Array.from(document.querySelectorAll('tbody tr')).forEach(x => {
            Array.from(x.children).forEach(y => {
               if(y.textContent.includes(document.getElementById('searchField').value)) {
                  y.parentNode.className = 'select';
               }
            })
         })
      }
      document.getElementById('searchField').value = '';
   }
}

function removeClassName(arr) {
   arr.forEach(x => {
      x.className = '';
   })
}

solve()