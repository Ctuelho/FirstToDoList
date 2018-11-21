module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
        people: _.times(5, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar(),
                password: '123456'
            }
        }),
        localuser: {
            name: '',
            id: ''
        }
    }
}