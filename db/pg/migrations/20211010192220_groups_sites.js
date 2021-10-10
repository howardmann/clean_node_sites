
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE Groups_Sites (
      id serial PRIMARY KEY,
      group_id int REFERENCES groups ON DELETE SET NULL,
      site_id int REFERENCES sites ON DELETE SET NULL
    );
  `)
};

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE Groups_Sites;
  `)
};

