import { EndpointService } from './decorators/express/services';
import { TestEndpoint } from './test.endpoint';
import express, { Application } from 'express';
import { check } from 'express-validator';
import { createEndpoint } from './decorators/express/routing';

const app: Application = express();
const t = new TestEndpoint();

app.use(express.json());

// EndpointService.for(TestEndpoint.name).createEndpoint(t, app);

createEndpoint(t, app);

app.get('/', (req, res) => {
    res.status(200).send('Welcome!');
});

app.listen(3030, () => {
    console.log('started');
});
