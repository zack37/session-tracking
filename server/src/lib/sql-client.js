import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.POSTGRES_URI ||
    'postgres://postgres@localhost:5432/session-tracker'
);

export default sequelize;
