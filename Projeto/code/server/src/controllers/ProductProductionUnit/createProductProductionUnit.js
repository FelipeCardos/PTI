const { ProductProductionUnit } = require("../../database/models");

async function CreateProductProductionUnit(
  product_id,
  production_unit_id,
  amount
) {
  if (amount <= 0) {
    return null;
  }
  const productProductionUnit = await ProductProductionUnit.create({
    product_id: product_id,
    production_unit_id: production_unit_id,
    amount: amount,
  });
  return productProductionUnit;
}

module.exports = { CreateProductProductionUnit };
