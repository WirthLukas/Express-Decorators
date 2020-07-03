import 'reflect-metadata';
import { TestEndpoint } from './test.endpoint';
import express, { Application } from 'express';
import { createEndpoint, createDocsFor } from './express-decorators/creation';
import * as fs from 'fs';
import { promisify } from 'util';
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

    doc.push('</main>', '</body>', '</html>');
    return doc.join('\n');
}

const main = async () => {
    const app: Application = express();
    app.use(express.json());

    const endpoints = [
        new TestEndpoint(),
        new GreetingEndpoint()
    ];

    endpoints.forEach(t => createEndpoint(t, app));
    const doc: string = createDocHtml(endpoints);

    // await writeFileAsync(`${__dirname}\\..\\public\\v1.html`, doc);

    app.get('/', (req, res) => {
        res.status(200).send('Welcome!');
    });

    app.listen(3030, () => {
        console.log('started');
    });
}

main().catch(err => console.error(err));