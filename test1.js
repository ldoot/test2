"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1 = void 0;
const sql_db_1 = require("langchain/sql_db");
const typeorm_1 = require("typeorm");
const test1 = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('eyo');
    const datasource = new typeorm_1.DataSource({
        type: "sqlite",
        database: "./chinook.db",
    });
    const db = yield sql_db_1.SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    });
    console.log(db.allTables.map((t) => t.tableName));
    /**
    [
    'Album',       'Artist',
    'Customer',    'Employee',
    'Genre',       'Invoice',
    'InvoiceLine', 'MediaType',
    'Playlist',    'PlaylistTrack',
    'Track'
    ]
    */
});
exports.test1 = test1;
