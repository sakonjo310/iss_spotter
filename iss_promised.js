const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const passes = JSON.parse(body);
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${passes.latitude}&lon=${passes.longitude}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
};

module.exports = {nextISSTimesForMyLocation};
