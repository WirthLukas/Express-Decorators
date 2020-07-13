import { Endpoint, Get, RouteDescription } from "./express-decorators/decorators";
import { Ok } from './express-decorators/models';

@Endpoint('greet')
export class GreetingEndpoint {
    
    @Get('/')
    @RouteDescription('Returns a polite greeting')
    get() {
        return Ok('Hello my friend :D');
    }

}