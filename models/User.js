const collection = "User";

// Schema
const UserSchema = {
    name: collection,
    properties: {
        _id: "int",
        name: "string",
        age: "string?",
    },
    primaryKey: "_id",
};

// class User {
//     static schema = {
//         name: collection,
//         properties: {
//             _id: "int",
//             name: "string",
//             age: "string?",
//         },
//         primaryKey: "_id",
//     }

//     constructor({ id, name, age }) {
//         this._id = id;
//         this.name = name;
//         this.age = age;
//     }
// }

module.exports = UserSchema;
// module.exports = User.schema
