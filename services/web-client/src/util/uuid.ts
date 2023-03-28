export class UUID {
  static #cache = new Set();

  static new(): string {
    const hex = "0123456789ABCDEF";
    const model = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
    var str = "";
    for (var i = 0; i < model.length; i++) {
      var rnd = Math.floor(Math.random() * hex.length);
      str += model[i] == "x" ? hex[rnd] : model[i];
    }

    const id = str.toLowerCase();

    //dup check
    if (UUID.#cache.has(id)) {
      return UUID.new();
    }

    UUID.#cache.add(id);

    return id;
  }
}
