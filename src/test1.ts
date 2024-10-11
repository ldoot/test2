import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";

export const test1 = async () => {
    console.log('eyo');

    const datasource = new DataSource({
        type: "sqlite",
        database: "./chinook.db",
    });

    const db = await SqlDatabase.fromDataSourceParams({
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
}