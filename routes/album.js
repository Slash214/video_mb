const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFAlbum,
  FFText,
  FFImage,
  FFCreator,
} = require("ffcreator");
const { config } = require("../conf/index");
const colors = require("colors");
const path = require("path");

const genImage = (paths) => {
  const img = new FFImage(paths);
  img.setXY = (500, 500);
  img.setScale(2); // 设置缩放
  img.setRotate(45); // 设置旋转
  img.setOpacity(0.3); // 设置透明度
  img.setWH(1024, 768);
  img.addEffect("fadeInDown", 1, 1);

  return img;
};

const genText = (texts) => {
  const text = new FFText({
    text: texts,
    x: "500",
    y: "800",
  });

  text.setColor("#ffffff"); // 文字颜色
  text.setBackgroundColor("#b33771"); // 背景色
  text.addEffect("fadeInDown", 1, 1); // 动画
  text.alignCenter(); // 文字居中
  text.setStyle({ padding: [4, 12, 6, 12] }); // 设置样式object

  return text;
};

let imgList = [
  "https://img.pinkyang.cn/1664465564139-jskc@2.jpg",
  "https://img.pinkyang.cn/1666538380937-ypjc@2.jpg",
  "https://img.pinkyang.cn/1664118409336-wfi@2.jpg",
  "https://img.pinkyang.cn/1664039363708-xl@2.jpg",
  "https://img.pinkyang.cn/1667269936544-mh.png",
  "https://img.pinkyang.cn/1663249817700-ccleanr@2.jpg",
  "https://img.pinkyang.cn/1663602435784-xhs.jpg",
];

const createFFTask = () => {
  // 创建 入口
  const creator = new FFCreator({
    width: 1920,
    height: 1080,
    cacheDir: config.cacheDir,
    outputDir: path.join(__dirname, "../output/"),
    debug: false,
    log: true,
    fps: 24,
    
  });

  // 添加背景音乐
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

  const album = new FFAlbum({
    list: imgList,
    x: 1920 / 2,
    y: 1080 / 2,
    width: 1920,
    height: 1080,
    showCover: false,
  });
  album.setDuration(2);
  const scene2 = new FFScene();
  scene2.addChild(album);
  creator.addChild(scene2);
  creator.start();
  creator.on("start", () => {
    console.log(`FFCreator start`);
  });

  creator.on("error", (e) => {
    console.log(`FFCreator error: ${e.error}`);
  });

  creator.on("progress", (e) => {
    console.log(
      colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`)
    );
  });

  creator.on("complete", (e) => {
    console.log(
      colors.magenta(
        `FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
      )
    );
    console.log(
      colors.green(
        `\n --- You can press the s key or the w key to restart! --- \n`
      )
    );
  });
  // 添加第一个屏幕画面
  return creator;
};

const id = FFCreatorCenter.addTask(createFFTask);
console.log(id);
