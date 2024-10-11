import { ChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { QuerySqlTool } from "langchain/tools/sql";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

export const test3 = async () => {
    console.log('eyo3');
    const datasource = new DataSource({
        type: "sqlite",
        database: './Chinook_real.db'
    });
    const db = await SqlDatabase.fromDataSourceParams({
     appDataSource: datasource,
    });
    const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

    const executeQuery = new QuerySqlTool(db);
    const writeQuery = await createSqlQueryChain({
        llm,
        db,
        dialect: "sqlite",
    });

    const answerPrompt =
    PromptTemplate.fromTemplate(`Given the following user question, corresponding SQL query, and SQL result, answer the user question.

    Question: {question}
    SQL Query: {query}
    SQL Result: {result}
    Answer: `);

    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
        RunnablePassthrough.assign({ query: writeQuery }).assign({
            result: (i: { query: string }) => {
                const transformedQuery = i.query.replace(/`/g,'').replace('sql', '');
                console.log('TRANSFORMED QUERY: ', transformedQuery)  //work around to make the SQL to be valid
                return executeQuery.invoke(transformedQuery)
            },
        }),
        answerChain,
    ]);
    console.log(await chain.invoke({ question: "How many artists are there" }));
    /**
    There are 8 employees.
    */
}