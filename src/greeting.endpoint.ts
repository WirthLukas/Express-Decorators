import { Endpoint, Get, Description } from "./express-decorators/decorators";
import { Ok } from './express-decorators/models';

@Endpoint('greet')
export class GreetingEndpoint {
    
    @Get('/')
    @Description('Returns a polite greeting')
    get() {
        return Ok('Hello my firend :D');
    }

}