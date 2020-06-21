import { EndpointService } from './decorators/express/services';
import { TestEndpoint } from './test.endpoint';
import express, { Application } from 'express';


const app: Application = express();

const t = new TestEndpoint();

EndpointService.createEndpoint(t, TestEndpoint.name, app);

app.get('/', (req, res) => {
    res.status(200).send('Welcome!');
})

app.listen(3030, () => {
    console.log('started');
});
