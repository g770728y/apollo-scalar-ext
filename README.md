# apollo-scalar-ext

apollo graphql scalar 扩展.
当前仅提供支持 mongodb 的 where scalar 扩展.

## Where scalar

### Why

使用 mongodb + apollo server + apollo client 时, gql 的写法:

    query(where:JSON, skip:Int, limit:Int): [Item!]!  <== JSON使用apollo-scalar-json包

我们期待:
  
 db.get('items').find({where, skip, limit}) <=== 直接使用上面的 where

存在的问题是:

1. where 里的\_id, itemId, 并不会自动转换为 ObjectId, 需要手动转换
2. where 里的 date 是字符串表示, 需要手动转换

where scalar 用于解决上述问题.

### Usage

    npm i apollo-scalar-ext

    yarn add apollo-scalar-ext
