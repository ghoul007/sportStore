const casual = require("casual");
const Readable = require("readable-stream").Readable;
const util = require("util");
const fs = require("fs");

util.inherits(Fake, Readable);

function Fake(n, name) {
    if (!(this instanceof Fake)) return new Fake(n, name);
    this.count = 0;
    this.numProducts = n;
    this.name = name;
    Readable.call(this);
}

Fake.prototype._read = function _read() {
    if (this.count === 0) this.push('{"' + this.name + '":[');
    if (this.count === this.numProducts) {
        this.push("]}");
        this.push(null);
        return;
    }
    this.push(JSON.stringify(casual[this.name]));
    if (this.count < this.numProducts - 1) this.push(",");
    this.count += 1;
};

/**
 * product fake
 */
casual.define("product", () => {
    return {
        id: casual.uuid,
        name: casual.title,
        category: casual.random_element(["category1", "category2", "category3"]),
        price: casual.integer((from = 10), (to = 1000)),
        description: casual.description
    };
});

/**
 * order fake
 */
casual.define("order", () => {
    return {
        id: casual.uuid,
        name: casual.name,
        address: casual.address,
        city: casual.city,
        state: casual.state,
        zip: casual.zip,
        country: casual.country,
        shipped: casual.boolean
    };
});

rs = Fake(20, "product");
ws = fs.createWriteStream("./product.json");
rs.pipe(ws);