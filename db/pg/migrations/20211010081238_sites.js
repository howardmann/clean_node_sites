
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE Sites (
      id serial PRIMARY KEY,
      name varchar(100),
      state varchar(100)
    );
  `)  
};

exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE Sites;
  `)
};



