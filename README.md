# apollo-scalar-ext
apollo graphql scalar 扩展. 
当前仅提供支持 mongodb 的where scalar扩展.

## Where scalar
### Why
使用mongodb + apollo server + apollo client 时, gql的写法:

    query(where:JSON, skip:Int, limit:Int): [Item!]!  <== JSON使用apollo-scalar-json包
   
我们期待:
    
    db.get('items').find({where, skip, limit})  <=== 直接使用上面的where
  
存在的问题是:
1. where里的_id, itemId, 并不会自动转换为 ObjectId, 需要手动转换
2. where里的date是字符串表示, 需要手动转换

where scalar用于解决上述问题.

### Usage

