const { FindProductWithId } = require("../Product/findProducts");
const { FindUserById } = require("../User/findUsers");
const { FindAddressById } = require("../Address/findAddress");
const axios = require("axios");
const { use } = require("passport");
require("dotenv").config();

async function getCoordinatesFromAddress(address) {
  const url = "https://api.geoapify.com/v1/geocode/search";
  const apiKey = process.env.MAP;

  console.log(
    address.street +
      ", " +
      address.postal_code +
      ", " +
      address.state +
      ", " +
      address.country
  );
  const response = await axios.get(url, {
    params: {
      text:
        address.street +
        ", " +
        address.postal_code +
        ", " +
        address.state +
        ", " +
        address.country,
      format: "json",
      apiKey: apiKey,
    },
  });

  return response.data.results[0];
}

async function getCoordinatesFromUserAndProduct(userId, productId) {
  let result = [];

  const user = await FindUserById(userId);

  const userAddressId = user.address_id;

  const userAddress = await FindAddressById(userAddressId);

  const url = "https://api.geoapify.com/v1/geocode/search";
  const apiKey = process.env.MAP;

  console.log(
    userAddress.street +
      ", " +
      userAddress.postal_code +
      ", " +
      userAddress.state +
      ", " +
      userAddress.country
  );

  await axios
    .get(url, {
      params: {
        text:
          userAddress.street +
          ", " +
          userAddress.postal_code +
          ", " +
          userAddress.state +
          ", " +
          userAddress.country,
        format: "json",
        apiKey: apiKey,
      },
    })
    .then(async (response) => {
      result.push(response.data.results[0].lon);
      result.push(response.data.results[0].lat);
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });

  const product = await FindProductWithId(productId);

  const producerId = product.producer_id;

  const producer = await FindUserById(producerId);

  const producerAddressId = producer.address_id;

  const producerAddress = await FindAddressById(producerAddressId);

  console.log(
    producerAddress.street +
      ", " +
      producerAddress.postal_code +
      ", " +
      producerAddress.state +
      ", " +
      producerAddress.country
  );
  await axios
    .get(url, {
      params: {
        text:
          producerAddress.street +
          ", " +
          producerAddress.postal_code +
          ", " +
          producerAddress.state +
          ", " +
          producerAddress.country,
        format: "json",
        apiKey: apiKey,
      },
    })
    .then(async (response) => {
      result.push(response.data.results[0].lon);
      result.push(response.data.results[0].lat);
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

function calculatedistance(lon1, lat1, lon2, lat2) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

// function getCoordinates(userId, productId) {
//     getCoordinatesFromUserAndProduct(userId, productId).then(() => {
//         console.log(lonUser, latUser, lonProd, latProd);
//         return [lonUser, latUser, lonProd, latProd];
//     });
// }

module.exports = {
  getCoordinatesFromAddress,
  getCoordinatesFromUserAndProduct,
  calculatedistance,
};
