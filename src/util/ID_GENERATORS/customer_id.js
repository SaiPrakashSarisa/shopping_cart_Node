const iniqueid = require("generate-unique-id");

exports.generteCustomerId = (retailer) => {
  const generated = iniqueid({
    length: 10,
    useLetters: false,
    useNumbers: true,
  });

  if (retailer) {
    return (id = "RETAILER" + generated);
  } else {
    return (id = "CUSTOMER" + generated);
  }
};
