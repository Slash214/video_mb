> 视频模板相册导出，传入图片就可导出视频，完整code还未上传，正在整理

# version
node 14.12.0

# 2023/02/07 重构


# 安装过程

容易碰到问题的地方就是安装canvas

在里面的包安ffcreator 容易出现问题是因为包里面包括了canvas，所以解决办法先去
安装canvas再去安装ffcreator，

版本node v14.12.0

使用下面的命令安装
npm install canvas --canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas/

然后成功了再去npm install ffcreator 就可以



# 2023-2-10 

测试lottie 使用 ae 制作模板 导入JSON文件来操作
目前正在测试，效果是可行的！



# 2023-2-15
测试代码成功，可以使用自己制作的AE模板，实现相册模板替换




