const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFAlbum,
  FFText,
  FFImage,
  FFCreator,
} = require("ffcreator");
const path = require("path");

let imgList = [
  "https://img.pinkyang.cn/1664465564139-jskc@2.jpg",
  "https://img.pinkyang.cn/1666538380937-ypjc@2.jpg",
  "https://img.pinkyang.cn/1664118409336-wfi@2.jpg",
  "https://img.pinkyang.cn/1664039363708-xl@2.jpg",
  "https://img.pinkyang.cn/1667269936544-mh.png",
  "https://img.pinkyang.cn/1663249817700-ccleanr@2.jpg",
  "https://img.pinkyang.cn/1663602435784-xhs.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
  "https://p2.piqsels.com/preview/980/741/314/astronomy-black-wallpaper-constellation-cosmos.jpg",
];

const creator = new FFCreator({
  width: 1920,
  height: 1080,
  cacheDir: path.join(__dirname, "../cache/"),
  outputDir: path.join(__dirname, "../output/"),
  debug: false,
  log: true,
  fps: 30,
  cover: path.join(__dirname, "../assets/imgs/cover/cover2.jpg"),
});

let audio = path.join(__dirname, "../assets/audio/1.mp3");
creator.addAudio(
  new FFAudio({
    path: audio,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true,
  })
);


// 创建画面， 画面添加图片文字  creator 添加画面
for (let [index, item] of imgList.entries()) {
  console.log("开始循环", index);
  let sccens = new FFScene();

  let img = new FFImage({
    path: item,
    x: 1920 / 2,
    y: 1080 / 2,
    width: 1920,
    height: 1080,
    animate: "fadeIn",
  });

  let text = new FFText({
    text: `我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签我是文字文本标签${index}`,
    fontSize: 48,
    color: "#222222",
    x: 1920 / 4,
    y: 1080 / 4,
    font: path.join(__dirname, "../assets/font/font1.ttf"),
    style: [10, 10, 10, 10],
  });
  text.addEffect("fadeIn", 1);
  text.alignCenter();
  sccens.setTransition("TricolorCircle", 1);
  sccens.addChild(img);
  sccens.addChild(text);
  creator.addChild(sccens);
}

//
// console.log(creator);

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
