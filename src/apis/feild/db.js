export default class {
    getDb() {
        return this;
    }
    static list() {
        console.log(typeof this.constructor);
    }
}