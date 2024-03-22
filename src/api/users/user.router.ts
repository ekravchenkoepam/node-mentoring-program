import { IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithStringQuery } from 'url';
import * as userService from "./user.service";

const invalidRoute = (res: ServerResponse) => {
    res.writeHead(404);
    res.end('Invalid route');
};

export const router = (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) return invalidRoute(res);

    const { pathname }: UrlWithStringQuery = parse(req.url);

    if (pathname) {
        const userId = pathname.split('/')[3]

        const routes = [
            { pattern: '^/api/users/?$', method: 'GET', service: userService.getAllUsers },
            { pattern: '^/api/users/?$', method: 'POST', service: userService.createUser },
            { pattern: '^/api/users/[^/]+/?$', method: 'DELETE', service: userService.deleteUserById },
            { pattern: '^/api/users/[^/]+/hobbies/?$', method: 'GET', service: userService.getUserHobbies },
            { pattern: '^/api/users/[^/]+/hobbies/?$', method: 'PATCH', service: userService.updateUserHobby }
        ]

        for (const route of routes) {
            const regexp = new RegExp(route.pattern);
    
            if (req.method === route.method && regexp.test(pathname)) {
                return route.service(req, res, userId);
            }
        }
    }
    
    return invalidRoute(res);
}