// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {

    // 2020 Schema All
    const pointsSchema2020 = require("./src/data/2020/points_schema.json")
    const collection2020 = addCollection({
      typeName: 'Tasks2020'
    })
    pointsSchema2020.forEach((task) => {
      collection2020.addNode(task)
    })

    // 2021 Schema Frontend Track
    const webPointsSchema2021 = require('./src/data/2021/web.json');
    const collectionWeb2021 = addCollection({
      typeName: 'WebTasks2021'
    });

    for (const task of webPointsSchema2021) {
      collectionWeb2021.addNode(task);
    }

    const mobilePointsSchema2021 = require('./src/data/2021/mobile.json');
    const collectionMobile2021 = addCollection({
      typeName: 'MobileTasks2021'
    });

    for (const task of mobilePointsSchema2021) {
      collectionMobile2021.addNode(task);
    }

    // 2021 Schema Backend
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
