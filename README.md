# apollo-scalar-ext

apollo graphql scalar 扩展.
当前仅提供支持 mongodb 的 where scalar 扩展.

## Where scalar

### Why

使用 mongodb + apollo server + apollo client 时, gql 的写法:

    query(where:JSON, skip:Int, limit:Int): [Item!]  <== JSON使用graphql-scalar-json包

我们期待:

db.get('items').find({where, skip, limit}) <=== 直接使用上面的 where

存在的问题是:

1. where 里的\_id, itemId, 并不会自动转换为 ObjectId, 需要手动转换
2. where 里的 date 是字符串表示, 需要手动转换

where scalar 用于解决上述问题.

### Usage

1. install:
   npm i apollo-scalar-ext

   yarn add apollo-scalar-ext

2. 定义一个 scalar.ts 文件, 内容包含:

   scalar WHERE

3. 写一个 resolver 文件:

   import GraphqlMongoWhere from "apollo-scalar-ext"

   export const WHEREResolver = {
   WHERE: GraphqlMongoWhere
   }

4. gql 定义

   query(where:**WHERE**, skip:Int, limit:Int): [Item!]!
