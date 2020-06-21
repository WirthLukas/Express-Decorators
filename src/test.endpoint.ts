import { Endpoint, Get, InjectRouter } from './decorators/express/routing';
import { Request, Response, Router } from 'express';

@Endpoint('test')
export class TestEndpoint {

    @InjectRouter()
    public router: Router | undefined;
    public text: string = "Hello";

    @Get('/')
    getAll(req: Request, res: Response) {
        console.log(this.text);
        res.status(200).send(this.text);
    }

    @Get('/spec')
    getSpec(req: Request, res: Response) {
        console.log('spec');
        res.status(200).send('specific');
    }
}