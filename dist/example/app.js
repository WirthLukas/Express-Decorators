"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs = __importStar(require("fs"));
const util_1 = require("util");
const express_1 = __importDefault(require("express"));
const creation_1 = require("../creation");
const test_endpoint_1 = require("./test.endpoint");
const greeting_endpoint_1 = require("./greeting.endpoint");
const writeFileAsync = util_1.promisify(fs.writeFile);
const createDocHtml = (endpoints) => {
    const doc = [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<title>Guideo Docs</title>',
        '<meta charset="utf-8" />',
        '<link href="style.css" rel="stylesheet" />',
        '</head>',
        '<body>',
        '<main>'
    ];
    endpoints.forEach(t => doc.push(creation_1.createDocsFor(t)));
    doc.push('</main>', '<script src="./script.js"></script>', '</body>', '</html>');
    return doc.join('\n');
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(express_1.default.json());
    // provide static html files
    app.use('/', express_1.default.static(`${__dirname}\\..\\public\\`));
    // create the defined endpoints
    const endpoints = [
        new test_endpoint_1.TestEndpoint(),
        new greeting_endpoint_1.GreetingEndpoint()
    ];
    endpoints.forEach(t => creation_1.createEndpoint(t, app));
    // create documentation html
    const doc = createDocHtml(endpoints);
    yield writeFileAsync(`${__dirname}\\..\\..\\public\\v2.html`, doc);
    yield writeFileAsync(`${__dirname}\\..\\..\\public\\style.css`, creation_1.getCssContent());
    yield writeFileAsync(`${__dirname}\\..\\..\\public\\script.js`, creation_1.getJsScriptContent());
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
});
main().catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4YW1wbGUvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRCQUEwQjtBQUMxQix1Q0FBeUI7QUFDekIsK0JBQWlDO0FBQ2pDLHNEQUErQztBQUMvQywwQ0FBK0Y7QUFDL0YsbURBQStDO0FBQy9DLDJEQUF1RDtBQUV2RCxNQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUUvQyxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQWdCLEVBQVUsRUFBRTtJQUMvQyxNQUFNLEdBQUcsR0FBRztRQUNSLGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsUUFBUTtRQUNSLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsNENBQTRDO1FBQzVDLFNBQVM7UUFDVCxRQUFRO1FBQ1IsUUFBUTtLQUNYLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxxQ0FBcUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELE1BQU0sSUFBSSxHQUFHLEdBQVMsRUFBRTtJQUNwQixNQUFNLEdBQUcsR0FBZ0IsaUJBQU8sRUFBRSxDQUFDO0lBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLDRCQUE0QjtJQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBRTNELCtCQUErQjtJQUMvQixNQUFNLFNBQVMsR0FBRztRQUNkLElBQUksNEJBQVksRUFBRTtRQUNsQixJQUFJLG9DQUFnQixFQUFFO0tBQ3pCLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMseUJBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUvQyw0QkFBNEI7SUFDNUIsTUFBTSxHQUFHLEdBQVcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sY0FBYyxDQUFDLEdBQUcsU0FBUywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRSxNQUFNLGNBQWMsQ0FBQyxHQUFHLFNBQVMsNkJBQTZCLEVBQUUsd0JBQWEsRUFBRSxDQUFDLENBQUM7SUFDakYsTUFBTSxjQUFjLENBQUMsR0FBRyxTQUFTLDZCQUE2QixFQUFFLDZCQUFrQixFQUFFLENBQUMsQ0FBQztJQUV0RixvQkFBb0I7SUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7U0FPcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxlQUFlO0lBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9