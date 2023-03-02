// checks if length is too long
export const lengthCheck = (name, category, price, quantity) => {
  let newName;
  let newCategory;
  let value = (price * quantity).toFixed(2);

  if (name.split("").length > 14) {
    newName = name.split("").slice(0, 13).join("") + "...";
  } else newName = name.slice(0);

  if (category.split("").length > 14) {
    newCategory = category.split("").slice(0, 13).join("") + "...";
  } else newCategory = category.slice(0);
  if (value.toString().split("").length > 19) {
    value = value.split("").slice(0, 16).join("") + "...";
  }

  return { newName, newCategory, value };
};

// works out the value of all products
export const updates = (projects) => {
  let totalProducts = projects.length;
  let totalValue = 0;
  let outOfStocks = 0;
  projects.forEach((item) => {
    let value = item.price * item.quantity;
    totalValue += value;
    if (item.quantity === 0) outOfStocks++;
  });
  totalValue = totalValue.toFixed(2);
  return { totalProducts, totalValue, outOfStocks };
};

// works out the total amount of out of stocks
export const stock = (products) => {
  const items = [];
  products.forEach((item) => {
    if (item.quantity === 0) items.push(item);
  });
  return items;
};
