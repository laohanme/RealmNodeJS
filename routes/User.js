const Realm = require("realm");
const Promise = require("promise");
const { UserModel } = require("../models/models");

// Database Option
const name = "User";
const option = { path: "projectyDB", schema: [UserModel], schemaVersion: 1 };

// CRUD
// create
const createUser = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                let filter = realm.objects(name).filtered(`_id=${data._id}`);
                if (!filter.length > 0) {
                    realm.write(() => {
                        realm.create(name, data);
                        resolve(data);
                    });
                } else {
                    reject(`sorry, ${data.name} is exist`);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

// read
const read = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                if (data._id != null) {
                    let one = realm.objects(name).filtered(`_id=${data._id}`);
                    resolve(one);
                } else {
                    let all = realm.objects(name);
                    resolve(all);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

// update
const update = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                realm.write(() => {
                    let find = realm.objectForPrimaryKey(
                        name,
                        Number(data._id)
                    );
                    if (!find) {
                        reject("User not found");
                        return;
                    }

                    find.name = data.name;
                    find.age = data.age;
                    resolve();
                });
            })
            .catch((error) => {
                reject(error);
            });
    });

// delete
const deleteUser = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                realm.write(() => {
                    let find = realm.objectForPrimaryKey(
                        name,
                        Number(data._id)
                    );
                    if (!find) {
                        reject("User not found");
                        return;
                    }
                    realm.delete(find);
                    resolve();
                });
            })
            .catch((error) => {
                reject(error);
            });
    });

module.exports = {
    createUser,
    read,
    update,
    deleteUser,
};
