exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE Rankings (
      id serial PRIMARY KEY,
      rank varchar(225),
      month_end varchar(225),
      group_id int REFERENCES groups ON DELETE SET NULL,
      site_id int REFERENCES sites ON DELETE SET NULL
    );
  `)
};

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE Rankings;
  `)
};