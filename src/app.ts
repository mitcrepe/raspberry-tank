import { LocalHostingController } from "./localHostingController";

export function hello() {
    return 'hello';
}

let controller = new LocalHostingController();
controller.listen(3000);