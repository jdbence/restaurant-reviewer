function Schema(name) {
  return this.importSchema(lf.schema.create(name, 1));
}

Schema.prototype.importSchema = function importSchema(schemaBuilder) {
   
  // restaurant
  schemaBuilder.createTable('restaurant').
    addColumn('id', lf.Type.INTEGER).
    addColumn('name', lf.Type.STRING).
    addColumn('address', lf.Type.STRING).
    addColumn('hours', lf.Type.STRING).
    addColumn('created', lf.Type.STRING).
    addPrimaryKey(['id']);
    
  // restaurant_photo
  schemaBuilder.createTable('restaurant_photo').
    addColumn('id', lf.Type.INTEGER).
    addColumn('restaurant', lf.Type.INTEGER).
    addColumn('url', lf.Type.STRING).
    addColumn('name', lf.Type.STRING).
    addColumn('created', lf.Type.STRING).
    addPrimaryKey(['id']);
  
  // restaurant_rating
  schemaBuilder.createTable('restaurant_rating').
    addColumn('id', lf.Type.INTEGER).
    addColumn('restaurant', lf.Type.INTEGER).
    addColumn('rating', lf.Type.STRING).
    addColumn('created', lf.Type.STRING).
    addPrimaryKey(['id']);
  
  // restaurant_review
  schemaBuilder.createTable('restaurant_review').
    addColumn('id', lf.Type.INTEGER).
    addColumn('restaurant', lf.Type.INTEGER).
    addColumn('content', lf.Type.STRING).
    addColumn('created', lf.Type.STRING).
    addPrimaryKey(['id']);
    
  // user
  schemaBuilder.createTable('user').
    addColumn('id', lf.Type.INTEGER).
    addColumn('name', lf.Type.STRING).
    addColumn('created', lf.Type.STRING).
    addPrimaryKey(['id']);
  
  return schemaBuilder;
};