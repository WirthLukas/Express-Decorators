import 'reflect-metadata';
import { TestEndpoint } from './test.endpoint';
import express, { Application } from 'express';
import { createEndpoint } from './express-decorators/decorators';

const app: Application = express();
const t = new TestEndpoint();

app.use(express.json());
createEndpoint(t, app);

app.get('/', (req, res) => {
    res.status(200).send('Welcome!');
});

app.listen(3030, () => {
    console.log('started');
});
