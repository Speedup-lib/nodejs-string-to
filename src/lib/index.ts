/**
 * Library index
 */

class MySuperModule {

    /**
     * Person name
     */
    private _name: string;

    constructor(name: string) {

        this._name = name;
    }

    /**
     * Say hello to the person
     */
    sayHello(): string {

        return `Hello ${this._name}`;
    }
}

export default MySuperModule;