import { Router, Application, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCode, JsonResponse } from "./models";
import { injectRouterKey } from "./decorators";
import { EndpointMeta, getEndpointMeta, RouteAccess, RouteDefinition, ParameterConfig, ParameterType } from './meta';

export const createEndpoint = (instance: any, app: Application) => {
    const router = Router();

    initRoutes(instance, router);
    addRouterToApplication(app, instance, router);
    injectRouterIfNeccessary(router, instance);
}

const initRoutes = (instance: any, router: Router) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(instance.constructor);
    const routes: RouteAccess = endpointMeta.routes;
    
    Object.keys(endpointMeta.routes).forEach(methodName => {
        const route: RouteDefinition = routes[methodName];
        const validations = route.validations ?? [];    // if route.validations is null or undefined, the value will be []
        const middleware = route.middleware ?? [];
        const params: ParameterConfig[] = endpointMeta.params[methodName];

        router[route.method](route.path, validations, middleware, (req: Request, res: Response) => {
            const error: Result<ValidationError> = validationResult(req);

            if (!error.isEmpty())
                return res.status(StatusCode.BadRequest).json({ errors: error.array() });

            const args = extractParameters(req, params);
            args.push(req, res);

            Promise.resolve(instance[methodName].apply(instance, args))
                .then(result => {
                    if (result instanceof JsonResponse) {
                        res.status(result.statusCode).send(result.value);
                    }
                })
                .catch(err => {
                    res.status(500).send({ msg: `something went wrong!`, err: err.toString() });
                });
        });
    });
}

const extractParameters = (req: Request, params: ParameterConfig[]): any[] => {
    if (!params || !params.length) {
        return [];
    }

    const args = [];

    for (const { index, type, name } of params) {
        switch (type) {
            case ParameterType.Body:
                args[index] = name ? req.body[name] : req.body;
                break;
            case ParameterType.Params:
                args[index] = name ? req.params[name] : req.params;
                break;
            case ParameterType.Query:
                args[index] = name ? req.query[name] : req.query;
                break;
            case ParameterType.Headers:
                args[index] = name ? req.headers[name] : req.headers;
                break;
            case ParameterType.Cookies:
                args[index] = name ? req.cookies[name] : req.cookies;
                break;
            default:
                throw new Error('Not supported Param Type');
        }
    }

    return args;
}

const addRouterToApplication = (app: Application, instance: any, router: Router) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(instance.constructor);
    app.use(endpointMeta.path, router);
}

const injectRouterIfNeccessary = (router: Router, instance: any) => {
    if (Reflect.hasMetadata(injectRouterKey, instance.constructor)) {
        const injectRouterProperty = Reflect.getMetadata(injectRouterKey, instance.constructor);
        instance[injectRouterProperty] = router;
    }
}

// export const createDocsFor = (instance: any): string => {
//     const endpointPath = Reflect.getMetadata(endpointPathKey, instance.constructor) as string;

//     if (!endpointPath)
//         return '';

//     // define article
//     let result = ['<article class="endpoint-def">'];

//     // define header
//     result.push(
//             '<div class="endpoint-header collapsible">',
//             `<h1>${endpointPath}</h1>`,
//             '</div>'
//         );

//     // define endpoint content
//     result.push('<div class="collapsible-content">');

//     // endpoint desc
//     result.push(
//             '<section class="endpoint-desc">',
//             `<p>${getEndpointDescriptionMetadata(instance.constructor)}</p>`,
//             '</section>'
//         );

//     getRouteMetadata(instance.constructor).forEach((def: RouteDefinition) => {
//         result.push(`
//         <section class="${def.method} route">
//             <div>
//                 <h2>${def.method}</h2>
//             </div>
//             <div>
//                 <p class="code">${def.path}</p>
//                 <p>${getRouteDescriptionMetadata(instance.constructor, def.methodName)}</p>
//             </div>
//         </section>
//         `);
//     });

//     result.push('</div>', '</article>');
//     return result.join('\n');
// }

// export const getCssContent = (): string => {
//     return `
//      /*******************************************
//      *           General                    *
//      ********************************************/
     
//      body {
//          display: flex;
//          justify-content: center;
//          align-items: center;
//      }
     
//      main {
//          width: 70vw;
//      }
     
//      /*******************************************
//      *           Collapsible                    *
//      ********************************************/
     
//      .collapsible {
//          cursor: pointer;
//      }
     
//      .collapsible-content {
//          max-height: 0;
//          overflow: hidden;
//          transition: max-height 0.5s ease-out;
//      }
     
//      /*******************************************
//      *           Endpoint                       *
//      ********************************************/
     
//      .endpoint-def {
//          border: 2px solid lightgray;
//          border-radius: 10px;
//          margin-bottom: 1em;
//          padding: 0 1em;
//          box-shadow: 0 4px 10px 0 rgba(0,0,0,0.4);
//      }
     
//      .endpoint-header {
//          padding: 1.5em 0;
//      }
     
//      .endpoint-header h1 {
//          margin: 0;
//      }
     
//      /*******************************************
//      *           Routes                         *
//      ********************************************/
     
//      .get {
//          background-color: rgba(100, 255, 28, 0.555);
//      }
     
//      .post {
//          background-color: rgba(28, 210, 255, 0.555);
//      }
     
//      .put {
//          background-color: rgba(255, 251, 28, 0.65);
//      }
     
//      .delete {
//          background-color: rgba(236, 2, 2, 0.609);
//      }
     
//      .route {
//          display: flex;
//          align-items: center;
     
//          margin-bottom: 0.5em;
//          padding: 0 1em;
//          border-radius: 10px;
//      }
     
//      .route div:last-child {
//          margin: 0 0 0 2em;
         
//          width: 60%;
//      }
     
//      .route div:last-child p {
//          font-size: 20px;
//          margin: 0.5em;
//      }
     
//      .code {
//          border-radius: 7px;
//          color: white;
//          background-color: rgb(90, 90, 90);
//          padding: 1em;
//      }
     
//      .code:hover {
//          background-color: rgb(104, 104, 104);
//      }
//     `;
// }

// export const getJsScriptContent = (): string => {
//     return `
//     const coll = document.getElementsByClassName("collapsible");

//     for (let e of coll) {
//         e.addEventListener('click', function() {
//             // this.classList.toggle('something');
//             const content = this.nextElementSibling;
    
//             if (content.style.maxHeight) {
//                 content.style.maxHeight = null;
//             } else {
//                 content.style.maxHeight = content.scrollHeight + "px";
//             }
//         });
//     }
//     `;
// }
