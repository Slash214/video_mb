const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFAlbum,
  FFText,
  FFImage,
  FFCreator,
  FFLottie,
} = require("ffcreator");
const path = require("path");

// 加入little 动画
let file = path.join(__dirname, "../assets/animation/v1/data.json");
const flottie = new FFLottie({
  x: 1920 / 2,
  y: 1080 / 2,
  width: 1920,
  height: 1080,
  file,
  loop: false,
});
// console.log(file);
flottie.replaceAsset('image_0', "https://img.pinkyang.cn/1664465564139-jskc@2.jpg");
// flottie.replaceAsset('image_1', "https://img.pinkyang.cn/1666538380937-ypjc@2.jpg");
// flottie.replaceAsset('image_3', "https://img.pinkyang.cn/1664039363708-xl@2.jpg");


return
const audio = path.join(__dirname, "../assets/audio/1.mp3");
const outputDir = path.join(__dirname, "../output/");
const cacheDir = path.join(__dirname, "../cache/");
// const imgList = [
//   path.join(__dirname, "../assets/album/1.png"),
//   path.join(__dirname, "../assets/album/2.png"),
//   path.join(__dirname, "../assets/album/3.png"),
//   path.join(__dirname, "../assets/album/4.png"),
//   path.join(__dirname, "../assets/album/5.png"),
//   path.join(__dirname, "../assets/album/6.png"),
// ];

const creator = new FFCreator({
  width: 1920,
  height: 1080,
  cacheDir,
  outputDir,
  fps: 30,
  log: true,
  debug: false,
  cover: path.join(__dirname, "../assets/album/0.png"),
});

creator.addAudio(
  new FFAudio({
    path: audio,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true,
  })
);

const scenc = new FFScene();
scenc.addChild(flottie);
creator.addChild(scenc);

// for (let [index, item] of imgList.entries()) {
//   let sccens = new FFScene();

//   let img = new FFImage({
//     path: item,
//     x: 1920 / 2,
//     y: 1080 / 2,
//     width: 1920,
//     height: 1080,
//     animate: "fadeIn",
//   });

//   sccens.setTransition("TricolorCircle", 1);
//   sccens.addChild(img);
//   creator.addChild(sccens);
// }

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
