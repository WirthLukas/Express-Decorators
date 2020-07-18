import { Endpoint, Get, RouteDescription } from "../decorators";
import { Ok } from '../models';

@Endpoint('greet')
export class GreetingEndpoint {
    
    @Get('/')
    @RouteDescription('Returns a polite greeting')
    get() {
        return Ok('Hello my friend :D');
    }

}