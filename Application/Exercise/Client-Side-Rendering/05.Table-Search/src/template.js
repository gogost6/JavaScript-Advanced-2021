import {html} from '../../node_modules/lit-html/lit-html.js';
export const template = (data) => {
    return html`
            ${data.map(person => html`<tr>
                                        <td>${person.firstName} ${person.lastName}</td> 
                                        <td>${person.email}</td>
                                        <td>${person.course}</td>
                                    </tr>`)}`;
}