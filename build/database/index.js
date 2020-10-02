"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Users = require('../models/Users'); var _Users2 = _interopRequireDefault(_Users);
var _Note = require('../models/Note'); var _Note2 = _interopRequireDefault(_Note);
var _Folder = require('../models/Folder'); var _Folder2 = _interopRequireDefault(_Folder);

const sequelize = new (0, _sequelize.Sequelize)(_database2.default);

_Users2.default.init(sequelize);
_Note2.default.init(sequelize);
_Folder2.default.init(sequelize);

_Folder2.default.associate(sequelize.models);
_Note2.default.associate(sequelize.models);

exports. default = sequelize;
