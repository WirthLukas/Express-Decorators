"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsScriptContent = exports.getCssContent = exports.createDocsFor = void 0;
const meta_1 = require("../meta");
exports.createDocsFor = (instance) => {
    var _a;
    const endpointMeta = meta_1.getEndpointMeta(instance.constructor);
    if (!endpointMeta.path || endpointMeta.path === '')
        return '';
    // define article
    let result = ['<article class="endpoint-def">'];
    // define header
    result.push('<div class="endpoint-header collapsible">', `<h1>${endpointMeta.path}</h1>`, '</div>');
    // define endpoint content
    result.push('<div class="collapsible-content">');
    // endpoint desc
    result.push('<section class="endpoint-desc">', `<p>${(_a = endpointMeta.description) !== null && _a !== void 0 ? _a : "No Description"}</p>`, '</section>');
    Object.keys(endpointMeta.routes).forEach(methodName => {
        var _a;
        const route = endpointMeta.routes[methodName];
        result.push(`
        <section class="${route.method} route">
            <div>
                <h2>${route.method}</h2>
            </div>
            <div>
                <p class="code">${route.path}</p>
                <p>${(_a = route.description) !== null && _a !== void 0 ? _a : "No Description"}</p>
            </div>
        </section>
        `);
    });
    result.push('</div>', '</article>');
    return result.join('\n');
};
exports.getCssContent = () => {
    return `
     /*******************************************
     *           General                    *
     ********************************************/
     
     body {
         display: flex;
         justify-content: center;
         align-items: center;
     }
     
     main {
         width: 70vw;
     }
     
     /*******************************************
     *           Collapsible                    *
     ********************************************/
     
     .collapsible {
         cursor: pointer;
     }
     
     .collapsible-content {
         max-height: 0;
         overflow: hidden;
         transition: max-height 0.5s ease-out;
     }
     
     /*******************************************
     *           Endpoint                       *
     ********************************************/
     
     .endpoint-def {
         border: 2px solid lightgray;
         border-radius: 10px;
         margin-bottom: 1em;
         padding: 0 1em;
         box-shadow: 0 4px 10px 0 rgba(0,0,0,0.4);
     }
     
     .endpoint-header {
         padding: 1.5em 0;
     }
     
     .endpoint-header h1 {
         margin: 0;
     }
     
     /*******************************************
     *           Routes                         *
     ********************************************/
     
     .get {
         background-color: rgba(100, 255, 28, 0.555);
     }
     
     .post {
         background-color: rgba(28, 210, 255, 0.555);
     }
     
     .put {
         background-color: rgba(255, 251, 28, 0.65);
     }
     
     .delete {
         background-color: rgba(236, 2, 2, 0.609);
     }
     
     .route {
         display: flex;
         align-items: center;
     
         margin-bottom: 0.5em;
         padding: 0 1em;
         border-radius: 10px;
     }
     
     .route div:last-child {
         margin: 0 0 0 2em;
         
         width: 60%;
     }
     
     .route div:last-child p {
         font-size: 20px;
         margin: 0.5em;
     }
     
     .code {
         border-radius: 7px;
         color: white;
         background-color: rgb(90, 90, 90);
         padding: 1em;
     }
     
     .code:hover {
         background-color: rgb(104, 104, 104);
     }
    `;
};
exports.getJsScriptContent = () => {
    return `
    const coll = document.getElementsByClassName("collapsible");

    for (let e of coll) {
        e.addEventListener('click', function() {
            // this.classList.toggle('something');
            const content = this.nextElementSibling;
    
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    `;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcmVhdGlvbi9kb2N1bWVudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUF5RTtBQUU1RCxRQUFBLGFBQWEsR0FBRyxDQUFDLFFBQWdCLEVBQVUsRUFBRTs7SUFDdEQsTUFBTSxZQUFZLEdBQWlCLHNCQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXpFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssRUFBRTtRQUM5QyxPQUFPLEVBQUUsQ0FBQztJQUVkLGlCQUFpQjtJQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDaEQsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQ0gsMkNBQTJDLEVBQzNDLE9BQU8sWUFBWSxDQUFDLElBQUksT0FBTyxFQUMvQixRQUFRLENBQ1gsQ0FBQztJQUVOLDBCQUEwQjtJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDakQsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQ0gsaUNBQWlDLEVBQ2pDLE1BQU0sTUFBQSxZQUFZLENBQUMsV0FBVyxtQ0FBSSxnQkFBZ0IsTUFBTSxFQUN4RCxZQUFZLENBQ2YsQ0FBQztJQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTs7UUFDbEQsTUFBTSxLQUFLLEdBQW9CLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDLElBQUksQ0FBQzswQkFDTSxLQUFLLENBQUMsTUFBTTs7c0JBRWhCLEtBQUssQ0FBQyxNQUFNOzs7a0NBR0EsS0FBSyxDQUFDLElBQUk7cUJBQ3ZCLE1BQUEsS0FBSyxDQUFDLFdBQVcsbUNBQUksZ0JBQWdCOzs7U0FHakQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFBO0FBRVksUUFBQSxhQUFhLEdBQUcsR0FBVyxFQUFFO0lBQ3RDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1HTixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxHQUFXLEVBQUU7SUFDM0MsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0tBZU4sQ0FBQztBQUNOLENBQUMsQ0FBQSJ9