/**
 * 导出相册模板
 * 卡点视频模板
 */

const path = require("path");
const {
  FFScene,
  FFCreatorCenter,
  FFAudio,
  FFCreator,
  FFVideo,
  FFImage,
} = require("ffcreator");

// 这里定义一些常量
const conf = {
  width: 1080,
  height: 1920,
  music: path.join(__dirname, "..", "assets", "audio", "kad.wav"),
  cacheDir: path.join(__dirname, "../cache/"),
  outputDir: path.join(__dirname, "../output/"),
  fps: 30,
};

const compose = new FFCreator({
  width: conf.width,
  height: conf.height,
  cacheDir: conf.cacheDir,
  outputDir: conf.outputDir,
  fps: conf.fps,
  clarity: "high",
  debug: false,
  log: true,
});

// 全局背景音乐
compose.addAudio(
  new FFAudio({
    path: conf.music,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true,
  })
);


const video = new FFVideo({
  path: path.join(__dirname, '../assets/video/c.mp4'),
  x: conf.width / 2,
  y: conf.height / 2,
  width: conf.width * 0.7,
  height: conf.height * 0.7
})

let scences = new FFScene()
scences.addChild(video)
scences.setDuration(6)
scences.setTransition('Colorful')
compose.addChild(scences)

// 开始封装数组
const list = [
  { id: 1, data: path.join(__dirname, '../assets/imgs/bg/01.jpg'), animation: 'Colorful', time: 2 },
  { id: 2, data: path.join(__dirname, '../assets/imgs/bg/02.jpg'), animation: 'Colorful' , time: 1},
  { id: 3, data: path.join(__dirname, '../assets/imgs/bg/03.jpg'), animation: 'Colorful' , time: 2},
  { id: 4, data: path.join(__dirname, '../assets/imgs/bg/04.jpg'), animation: 'Colorful' , time: 1},
  { id: 5, data: path.join(__dirname, '../assets/imgs/bg/05.jpg'), animation: 'Colorful' , time: 1},
  { id: 6, data: path.join(__dirname, '../assets/imgs/bg/06.jpg'), animation: 'Colorful' , time: 1},
  { id: 7, data: path.join(__dirname, '../assets/imgs/bg/07.jpg'), animation: 'Colorful' , time: 1},
  { id: 8, data: path.join(__dirname, '../assets/imgs/bg/01.jpg'), animation: 'Colorful' , time: 2},
  { id: 9, data: path.join(__dirname, '../assets/imgs/bg/02.jpg'), animation: 'Colorful' , time: 1},
  { id: 10, data: path.join(__dirname, '../assets/imgs/bg/03.jpg'), animation: 'Colorful' , time: 2},
]

list.forEach((item, index) => {
  let scence = new FFScene();

  let imgs = new FFImage({
    path: item.data,
    x: conf.width / 2,
    y: conf.height / 2,
    width: conf.width,
    height: conf.height,
  })
  scence.addChild(imgs)
  scence.setDuration(item.time);
  scence.setTransition(item.animat);
  compose.addChild(scence);
});

compose.start();

compose.on("progress", (e) => {
  console.log(`进度条.... ${(e.percent * 100) >> 0}%`);
});

compose.on("complete", (e) => {
  console.log(`渲染成功 \n: useage: ${e.useage} \n path: ${e.output} `);
});

compose.on("error", (e) => {
  console.log(`渲染错误... : ${e.error}`);
});
