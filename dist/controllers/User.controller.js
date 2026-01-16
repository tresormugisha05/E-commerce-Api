"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.getAllUsers = getAllUsers;
exports.AddUser = AddUser;
exports.deleteUser = deleteUser;
exports.users = [
    {
        id: 1,
        name: "mugisha1",
        email: "tresor1@gmail.com",
        password: 12345
    },
    {
        id: 2,
        name: "mugisha2",
        email: "tresor2@gmail.com",
        password: 123456
    },
    {
        id: 3,
        name: "mugisha3",
        email: "tresor3@gmail.com",
        password: 1234567
    }
];
function getAllUsers(res) {
    res.send(exports.users);
}
function AddUser(req, res) {
    const newUser = req.body;
    exports.users.push(newUser);
    res.send({ message: "user Added:", user: newUser });
}
function deleteUser(req, res) {
    const userId = Number(req.params.id);
    const index = exports.users.findIndex(user => user.id == userId);
    if (index === -1) {
        return res
            .status(404)
            .send(`no user with id: ${userId}, please recheck!!`);
    }
    else {
        const deletedUser = exports.users.splice(index, 1)[0];
        return res.send({
            message: "user deleted successfully",
            user: deletedUser
        });
    }
}
//# sourceMappingURL=User.controller.js.map