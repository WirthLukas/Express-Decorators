import { Router, Request, Response } from "express";
import { query } from "express-validator";
import { Endpoint, Get, Validate, InjectRouter, Post, Middleware } from "./express-decorators/decorators/routing";
import { Ok } from "./express-decorators/models";

@Endpoint('test')
export class TestEndpoint {

    @InjectRouter()
    public router: Router | undefined;

    public text: string = "Hello";

    @Get('/')
    @Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    })
    getAll() {
        console.log(this.text);
        return new Ok(this.text);
    }

    @Get('/spec')
    @Get('/two')
    @Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    })
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
        // throw new Error('oh no, an exception');
        return new Ok("1");
    }

    @Post('/')
    add(req: Request, res: Response) {
        return new Ok(req.body);
    }
}