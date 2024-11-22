const users = [
  {
    username: "Kev",
    email: "kev.morel.musician@hotmail.com",
    user_icon_url: "https://f4.bcbits.com/img/a3732035058_16.jpg",
    friends: ["oscar"],
    location: {
      country: "United Kingdom",
      country_code: "GB",
      lat: 51.50735,
      long: -0.12776,
    },
  },
  {
    username: "oscar",
    email: "ringsandwibs@yahoo.com",
    user_icon_url:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/11/okarun-dandadan-opening.jpg",
    friends: ["Kev", "LailaStarr", "sam"],
    location: {
      country: "Norway",
      country_code: "NO",
      lat: 59.913868,
      long: 10.752245,
    },
  },
  {
    username: "sam",
    email: "miner.sam@hotmail.com",
    user_icon_url: "https://pbs.twimg.com/media/F2psK9zWAAAWbkh.jpg",
    friends: ["oscar", "kieran", "LailaStarr"],
    location: {
      country: "Australia",
      country_code: "AU",
      lat: -35.2802,
      long: 149.131,
    },
  },
  {
    username: "kieran",
    email: "balatrostan17@sky.com",
    user_icon_url:
      "https://static.wikia.nocookie.net/balatrogame/images/7/7d/Smeared_Joker.png",
    friends: ["sam", "charlie", "LailaStarr", "Clara"],
    location: {
      country: "South Africa",
      country_code: "ZA",
      lat: -29.11813,
      long: 26.22309,
    },
  },
  {
    username: "upender",
    email: "kalmkatas.upender@gmail.com",
    user_icon_url:
      "https://d235gwso45fsgz.cloudfront.net/as-assets/variants/uw7hpqx1x5nfps7km7wlmetmr9dv/a6206d8b8848d1f5f779dd436f25589e3a792fee204effd13dccee565e881abd",
    friends: ["charlie"],
    location: {
      country: "Peru",
      country_code: "PE",
      lat: -12.073231,
      long: -77.052716,
    },
  },
  {
    username: "charlie",
    email: "rachetandclankfan123@hotmail.com",
    user_icon_url: "https://avatarfiles.alphacoders.com/318/318640.jpg",
    friends: ["kieran", "upender", "B.Aldeegull", "Clara"],
    location: {
      country: "Hong Kong",
      country_code: "HK",
      lat: 22.3193,
      long: 114.1694,
    },
  },
  {
    username: "B.Aldeegull",
    email: "potus@gmail.com",
    user_icon_url:
      "https://i.natgeofe.com/k/afe51970-80c6-46c3-b047-4c407c72d874/bald-eagle-closeup_square.jpg",
    friends: ["charlie"],
    location: {
      country: "United States of America",
      country_code: "US",
      lat: 38.9072,
      long: -77.0369,
    },
  },
  {
    username: "LailaStarr",
    email: "manydeaths@yahoo.com",
    user_icon_url:
      "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/03/ManyDeathsLailaStarr-001-Cover-Main-PROMO.jpg",
    friends: ["kieran", "oscar", "sam"],
    location: {
      country: "India",
      country_code: "IN",
      lat: 28.6139,
      long: 77.2088,
    },
  },
  {
    username: "Clara",
    email: "bxtelgeuse@gmail.com",
    friends: ["kieran", "charlie"],
    location: {
      country: "Germany",
      country_code: "DE",
      lat: 52.52,
      long: 13.405,
    },
  },
];

module.exports = users;
