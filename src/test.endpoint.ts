import { Endpoint, Get, InjectRouter, Validate, Post } from './decorators/express/routing';
import { Request, Response, Router } from 'express';
import { query } from 'express-validator';
import { Ok, NotFound } from './models';

@Endpoint('test')
export class TestEndpoint {

    // @InjectRouter()
    public router: Router | undefined;

    public text: string = "Hello";

    @Get('/')
    getAll() {
        console.log(this.text);
        return new Ok(this.text);
    }

    @Get('/spec')
    @Get('/two')
    getSpec() {
        console.log('spec');
        return new Ok('specific');
    }

    @Get('/limited')
    @Validate(query('limit', 'no limit defined').isNumeric())
    @Validate(query('pos', 'need a position').isNumeric())
    getLimited(req: Request, res: Response) {
        const result: number[] = [];
        const limit = parseInt(req.query.limit as string);

        for (let i = 0; i < limit; i++ )
            result.push(Math.random() * 1000);

        return new Ok({ result: result });
    }

    @Get('/:id')
    async getById(req: Request, res: Response) {
        return new Ok("1");
    }

    // @Post('/')
    add(req: Request, res: Response) {
        return new Ok(req.body);
    }
}