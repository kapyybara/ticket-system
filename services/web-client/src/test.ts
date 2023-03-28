class Struct {
  constructor(public name: string, public children: (Field | Struct)[]) {
    this.children = children.map((node: any) => (Struct.isStruct(node) ? new Struct(node.name, node.children) : new Field(node.name, node.key)));
  }

  static isStruct(node: any) {
    return node?.children != null;
  }
}

class Field {
  constructor(public name: string, public key: string) {}
}

// ---

const a = new Struct('master-data', [
  {
    key: 'name',
    name: 'name',
  },
  {
    key: 'code',
    name: 'code',
  },
  {
    name: 'fields',
    children: [
      {
        key: 'name',
        name: 'name',
      },
      {
        key: 'code',
        name: 'code',
      },
      {
        key: 'type',
        name: 'type',
      },
      {
        name: 'inner',
        children: [
          {
            key: 'type',
            name: 'type',
          },
        ],
      },
    ],
  },
]);

console.log(a);
