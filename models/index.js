// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Products);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(
  Tag,
  {
    through: 'product_tag',
    foreignKey: 'product_id',
    as: 'product'
  }
);

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(
  Product,
  {
    through: 'product_tag',
    foreignKey: 'tag_id',
    as: 'tag'
  }
);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
