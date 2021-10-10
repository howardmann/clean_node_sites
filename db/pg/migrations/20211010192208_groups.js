
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE Groups (
      id serial PRIMARY KEY,
      name varchar(100)
    );
  `)
};

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE Groups;
  `)
};
