# Express-Decorators

Implementation of some Typescript Decorators for the express framework. 

## Example

**Endpoint class** (e.g. test.endpoint.ts)
```typescript

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
    add(req: Request) {
        return Ok(req.body);
    }
}

```

**Where you create the express application** (e.g. app.ts)
```typescript
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
// see in app.ts for createDocHtml
const doc: string = createDocHtml(endpoints);
await writeFileAsync(`${__dirname}\\..\\public\\v2.html`, doc);
await writeFileAsync(`${__dirname}\\..\\public\\style.css`, getCssContent());
await writeFileAsync(`${__dirname}\\..\\public\\script.js`, getJsScriptContent());

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
```

## Api

### Routing

* @Endpoint(...) - tbd.
* @Get(url: string) - Registers get route
* @Post(url: string) - Registers post route
* @Put(url: string) - Registers put route
* @Delete(url: string) - Registers delete route

### Parameters

* @Params(param?: string) - Express req.params object or single param, if param name was specified
* @Query(param?: string) - Express req.query object or single query param, if query param name was specified
* @Body(param?: string) - Express req.body object or single body param, if body param name was specified
* @Headers(property?: string) - Express req.headers object or single headers param, if headers param name was specified
* @Cookies(param?: string) - Express req.cookies object or single cookies param, if cookies param name was specified

### Documentation

* @EndpointDescription(text: string) - tbd.
* @RouteDescription(text: string) - tbd.

## Resources

Following links helped me a lot to finish this project.

* https://nehalist.io/routing-with-typescript-decorators/
* https://github.com/sjmeverett/express-decorators
* https://github.com/serhiisol/node-decorators/tree/master/express

## Contribute

Feel free to start an issue or offer a pull request :D.