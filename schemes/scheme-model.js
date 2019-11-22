const db = require('../data/db-config.js');

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({id});
};

function findSteps(id) {
    return db('steps')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .select('steps.id', 'steps.step_number', 'steps.instructions')
        .where({scheme_id: id})
        .orderBy('steps.step_number')
}

function add(scheme) {
    return db('schemes').insert(scheme)
        .then((res) => {
            const id = res[0]
            return db('schemes').where({id: id});
        })
}

function update(changes, id) {
    return db('schemes').where({id: id}).update(changes)
        .then((res) => {
            return db('schemes').where({id});
        })
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}; 
function remove(id) {
    return db('schemes').where({id: id}).del();
}

