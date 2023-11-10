'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobApplication.init({
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    cover_latter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};