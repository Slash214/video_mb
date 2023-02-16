/**
 * 测试 lottie动画
 */
const lottie = require("lottie-nodejs");
const { Image, Canvas } = require("canvas");
const path = require("path");
const axios = require("axios");
const { config } = require("../conf/index");
const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFCreator,
  FFLottie,
  FFText,
} = require("ffcreator");

// 获取图片url数据
const getImage = async (url) => {
  const item = await axios.get(url).then((res) => {
    return res;
  });
  console.log(item);
  return item;
};

let cover = path.join(__dirname, "../assets/imgs/bg.jpg")
let outputDir = path.join(__dirname, "../assets/output")

const creator = new FFCreator({
  width: 1920,
  height: 1080,
  cover,
  cacheDir: config.cacheDir,
  outputDir,
  debug: false,
  log: true,
  fps: 30,
  clarity: "high",
});


let audio = path.join(__dirname, "../assets/audio/bg.mp3");
creator.addAudio(
  new FFAudio({
    path: audio,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true,
  })
);

const listData = [
  {
    id: 1,
    data: path.join(__dirname, "../assets/test/data1.json"),
    animat: "Colorful",
    time: '2022年1月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_1.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_2.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_3.jpg") },
      { id: "image_3", value: path.join(__dirname, "../test/junyiyou_4.jpg") },
    ],
  },
  {
    id: 2,
    data: path.join(__dirname, "../assets/test/data2.json"),
    animat: "WaterWave",
    time: '2022年2月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_5.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_6.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_7.jpg") },
    ],
  },
  {
    id: 3,
    data: path.join(__dirname, "../assets/test/data3.json"),
    animat: "Stretch",
    time: '2022年4月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_8.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_9.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_10.jpg") },
    ],
  },
  {
    id: 4,
    data: path.join(__dirname, "../assets/test/data4.json"),
    animat: "WaterWave",
    time: '2022年5月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_11.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_12.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_13.jpg") },
      { id: "image_3", value: path.join(__dirname, "../test/junyiyou_14.jpg") },
      { id: "image_4", value: path.join(__dirname, "../test/junyiyou_15.jpg") },
    ],
  },
  {
    id: 5,
    data: path.join(__dirname, "../assets/test/data5.json"),
    animat: "Colorful",
    time: '2022年6月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_16.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_17.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_18.jpg") },
    ],
  },
  {
    id: 6,
    data: path.join(__dirname, "../assets/test/data6.json"),
    animat: "WaterWave",
    time: '2022年7月11号',
    replace: [
      { id: "image_0", value: path.join(__dirname, "../test/junyiyou_19.jpg") },
      { id: "image_1", value: path.join(__dirname, "../test/junyiyou_20.jpg") },
      { id: "image_2", value: path.join(__dirname, "../test/junyiyou_21.jpg") },
      { id: "image_3", value: path.join(__dirname, "../test/junyiyou_22.jpg") },
    ],
  },
];

listData.map((item, index) => {
  console.log("循环", index);
  const flottie = new FFLottie({
    x: 1920 / 2,
    y: 1080 / 2,
    width: 1920,
    height: 1080,
    file: item.data,
  });
  const scence = new FFScene();

  item.replace.forEach((e, key) => {
    flottie.replaceAsset(e.id, e.value);
  });

  const texts = new FFText({
    text: item.time, 
    x: 1920 / 2,
    y: 1000
  })
  texts.setColor("#ffffff");
  texts.setBackgroundColor("#000000");
  texts.addEffect("fadeIn", 1, 1)
  texts.setStyle({
    padding: [10, 10, 10, 10]
  })
  texts.alignCenter()


  scence.addChild(flottie);
  scence.addChild(texts)
  scence.setTransition(item.animat);
  scence.setDuration(5)
  creator.addChild(scence);
});



creator.start();

creator.on("start", () => {
  console.log(`FFCreator start`);
});

creator.on("error", (e) => {
  console.log(`FFCreator error: ${e.error}`);
});

creator.on("progress", (e) => {
  console.log(`FFCreator progress: ${(e.percent * 100) >> 0}%`);
});

creator.on("complete", (e) => {
  console.log(
    `FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
  );
  console.log(`\n --- You can press the s key or the w key to restart! --- \n`);
});
