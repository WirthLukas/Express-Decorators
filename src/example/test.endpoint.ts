import { Router, Request, Response } from "express";
import { query } from "express-validator";
import { Endpoint, Get, Validate, InjectRouter, Post, Middleware, EndpointDescription, RouteDescription, Params, Query, Headers } from "../decorators";
import { Ok } from "../models";

@Endpoint('test')
@EndpointDescription('just for testing')
export class TestEndpoint {

    @InjectRouter()
    public router: Router | undefined;

    public text: string = "Hello";

    @Get('/')
    @Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    })
    @RouteDescription('Simple get route')
    getAll() {
        console.log(this.text);
        return Ok(this.text);
    }

    @Get('/spec')
    @Get('/two')
    @Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    })
    getSpec() {
        console.log('spec');
        return Ok('specific');
    }

    @Get('/limited')
    @Validate(query('limit', 'no limit defined').isNumeric())
    @Validate(query('pos', 'need a position').isNumeric())
    getLimited( @Query('limit') limit: any) {
        const result: number[] = [];
        limit = parseInt(limit);

        for (let i = 0; i < limit; i++ )
            result.push(Math.random() * 1000);

        return Ok({ result: result });
    }

    @Get('/return')
    returner(@Headers() header: any) {
        return Ok(header);
    }

    @Get('/:id')
    async getById( @Params('id') id: string) {
        // throw new Error('oh no, an exception');
        console.log(id);
        return Ok("The id " + id);
    }

    @Post('/')
    add(req: Request, res: Response) {
        res.setHeader('test-value', 'it works');
        return Ok(req.body);
    }
}