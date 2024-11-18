const users = [
  {
    username: "Kev",
    email: "kev.morel.musician@hotmail.com",
    friends: ["oscar"],
    location: {
      country: "England",
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
      lat: 59.913868,
      long: 10.752245,
    },
  },
  {
    username: "me",
    email: "me@gmail.com",
    friends: [],
    location: {
      country: "England",
      lat: 51.50735,
      long: -0.12776,
    },
  },
  {
    username: "sam",
    email: "miner.sam@hotmail.com",
    user_icon_url: "https://pbs.twimg.com/media/F2psK9zWAAAWbkh.jpg",
    friends: ["oscar", "kieran", "LailaStarr"],
    location: {
      country: "Australia",
      lat: -35.2802,
      long: 149.131,
    },
  },
  {
    username: "kieran",
    email: "balatrostan17@sky.com",
    user_icon_url:
      "https://static.wikia.nocookie.net/balatrogame/images/6/60/Perkeo.png/revision/latest/thumbnail/width/360/height/360?cb=20240406043156",
    friends: ["sam", "charlie", "LailaStarr", "Clara"],
    location: {
      country: "South Africa",
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
      country: "Brazil",
      lat: -15.7975,
      long: -47.8919,
    },
  },
  {
    username: "charlie",
    email: "rachetandclankfan123@hotmail.com",
    user_icon_url: "https://avatarfiles.alphacoders.com/318/318640.jpg",
    friends: ["kieran", "upender", "BoeJiden", "Clara"],
    location: {
      country: "Hong Kong",
      lat: 22.3193,
      long: 114.1694,
    },
  },
  {
    username: "BoeJiden",
    email: "potus@gmail.com",
    user_icon_url:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg",
    friends: ["charlie"],
    location: {
      country: "United States of America",
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
      lat: 28.6139,
      long: 77.2088,
    },
  },
  {
    username: "Clara",
    email: "bxtelgeuse@gmail.com",
    user_icon_url:
      "https://cdn.britannica.com/75/137075-050-57D0ACFA/Betelgeuse-ultraviolet-light-Hubble-Space-Telescope.jpg",
    friends: ["kieran", "charlie"],
    location: {
      country: "Germany",
      lat: 52.52,
      long: 13.405,
    },
  },
];

module.exports = users;
