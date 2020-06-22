import { Endpoint, Get, InjectRouter, Validate } from './decorators/express/routing';
import { Request, Response, Router } from 'express';
import { query } from 'express-validator';

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
    @Get('/two')
    getSpec(req: Request, res: Response) {
        console.log('spec');
        res.status(200).send('specific');
    }

    @Get('/limited')
    @Validate(query('limit', 'no limit defined').isNumeric())
    @Validate(query('pos', 'need a position').isNumeric())
    getLimited(req: Request, res: Response) {
        const result: number[] = [];
        const limit = parseInt(req.query.limit as string);

        for (let i = 0; i <= limit; i++ )
            result.push(Math.random() * 1000);

        res.status(200).send({ result: result });
    }
}