import 'reflect-metadata';
import * as fs from 'fs';
import { promisify } from 'util';
import express, { Application } from 'express';
import { createEndpoint, createDocsFor, getCssContent, getJsScriptContent } from '../creation';
import { TestEndpoint } from './test.endpoint';
import { GreetingEndpoint } from './greeting.endpoint';

const writeFileAsync = promisify(fs.writeFile);

const createDocHtml = (endpoints: any[]): string => {
    const doc = [ 
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<title>Guideo Docs</title>',
        '<meta charset="utf-8" />',
        '<link href="style.css" rel="stylesheet" />',
        '</head>',
        '<body>',
        '<main>'
    ];

    endpoints.forEach(t => doc.push(createDocsFor(t)));

    doc.push('</main>', '<script src="./script.js"></script>', '</body>', '</html>');
    return doc.join('\n');
}

const main = async () => {
    const app: Application = express();
    app.use(express.json());

    // provide static html files
    app.use('/', express.static(`${__dirname}\\..\\public\\`));

    // create the defined endpoints
    const endpoints = [
        new TestEndpoint(),
        new GreetingEndpoint()
    ];

    endpoints.forEach(t => createEndpoint(t, app));

    // create documentation html
    const doc: string = createDocHtml(endpoints);
    await writeFileAsync(`${__dirname}\\..\\..\\public\\v2.html`, doc);
    await writeFileAsync(`${__dirname}\\..\\..\\public\\style.css`, getCssContent());
    await writeFileAsync(`${__dirname}\\..\\..\\public\\script.js`, getJsScriptContent());

    // define a homepage
    app.get('/', (req, res) => {
        res.status(200).send(`
        <div>
            <p>Welcome!</p>
            <div>
                <a href="./v2.html">Docs</a>
            </div>
        </div>
        `);
    });

    // start server
    app.listen(3030, () => {
        console.log('started');
    });
}

main().catch(err => console.error(err));