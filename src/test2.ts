import { ChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";



export const test2 = async () => {
    const datasource = new DataSource({
        type: "sqlite",
        database: './Chinook_real.db'
    });
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    });

    const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });
    const chain = await createSqlQueryChain({
        llm,
        db,
        dialect: "sqlite",
    });

    const response = await chain.invoke({
     question: "How many artists are there?",
    });
  
    console.log("RESPONSE: ", response);

    const transformedResponse = response.replace(/`/g,'').replace('sql', '');

    console.log('TRANSFORMED RESPONSE: ', transformedResponse);
    /**
    response SELECT COUNT(*) FROM "Employee"
    */
    console.log("db run result", await db.run(transformedResponse));
    /**
    db run result [{"COUNT(*)":8}]
    */
}