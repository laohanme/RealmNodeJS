const Realm = require("realm");
const Promise = require("promise");
const { UserModel } = require("../models/models");

// Database Option
const collection = "User";
const option = { path: "projectyDB", schema: [UserModel], schemaVersion: 1 };

// CRUD
// create
const createUser = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                let filter = realm.objects(collection).filtered(`_id=${data._id}`);
                !filter.length > 0
                    ? realm.write(() => {
                          realm.create(collection, data);
                          resolve(data);
                      })
                    : reject(`sorry, ${data.name} is exist`);
            })
            .catch((error) => {
                reject(error);
            });
    });

// read
const readUser = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                if (data._id) {
                    let getOne = realm.objects(collection).filtered(`_id=${data._id}`);
                    resolve(getOne);
                } else {
                    let getAll = realm.objects(collection);
                    resolve(getAll);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

// update
const updateUser = (data) =>
    new Promise((resolve, reject) => {
        Realm.open(option)
            .then((realm) => {
                realm.write(() => {
                    let find = realm.objectForPrimaryKey(
                        collection,
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
                        collection,
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
    readUser,
    updateUser,
    deleteUser,
};
