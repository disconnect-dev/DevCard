export class BasePage {
    constructor(
        path,
        handler = () => {}
    ) {
        this.path = path;
        this.handler = handler;
    }
}