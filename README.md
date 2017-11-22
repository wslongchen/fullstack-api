### 前言

本文首发公众号【一名打字员】

入门到放弃之node系列终于新鲜出炉了，这个系列覆盖了从基础到进阶的基本知识与方向，适合入门的打字员们，系列结束后你可以建立一个自己的网站，写一个自己的服务端应用或者更多。系列中大都是打字员们口口相传的言论，不代表官方观点。

本系列环境 ```MAC OS 10.12.6```,```node v8.0```,```npm 5.0.4```.

### 背景

众所周知Node.js是一个基于V8引擎的JavaScript运行环境，由Ryan Dahl开发。它使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。关于node的详细在这里就不做多的介绍，大家可以在[wiki][1]或者在搜索引擎中查看更多详细介绍。

大家只需要知道基于node，可以轻松的写出高性能的WEB服务器，也能够写出提高工作效率的工具，实在是前端人员的福音。

### NPM

在进行下一步之前不得不介绍一下npm，node拥有一个强大的生态圈，npm则是全球最大的开源库生态系统。它是一个包管理器，能在代码部署上解决很多问题。
通常我们可以这样使用NPM。
1. 下载别人开源的第三方包到本地使用。

2. 将自己编写的包开源供别人使用。

我们可以通过```nom install argv```来安装node应用中所需要的模块。使用```npm init```初始化项目。

### 安装
关于node的安装这里不多费口舌，我们可以进入node的[中文官网][2]下载最新版本，然后进行安装。MAC中一般会自带node环境，Linux和Windows下均需要自行下载编译安装。

当我们输入```node -v```能够打印出node的对应版本信息时，代表已经成功安装node。

### HelloWord

是的，令人激动的helloword要开始了，每当我们接触到新的语言时，我们通常写的第一段代码就是HelloWord。我们下载好node之后如何运行呢，我们可以新建一个js文件，在里面写上以下内容：

![clipboard.png](/img/bVYYoV)

运行```node helloword.js```
![clipboard.png](/img/bVYYo7)

是不是看到了熟悉的Hello Word。
是的，你没有看错，这就是你熟悉的js语法，和你平常写的代码一毛一样，但是你却可以直接使用命令交互模式调试js代码片段。这样无论你是前端写写js特效、flash写脚本效果、untity3D脚本游戏打字员（请允许我这么称呼）或者其它打字员，你都可以方便的使用起来。
￼
### 基本概念

学习node我们需要掌握以下几个概念：
1. 模块
    通常我们写的应用程序都会比较大，我们会将其进行模块化，在node中我们可以将代码进行整理，放在不同的文件中，每一个文件就是一个模块，路径名称就是模块名。我们可以使用```require```来导入其它模块，也可以使用ES2015的语法```import```。如下所示：
```js
var func1= require('./func');
var func2 = require('./func.js');
var func3 = require('/home/mrpan/func');
var func4 = require('/home/mrpan/func.js');
//当然我们也可以这样引入一个json文件
var data = require('./data.json');
```
   通常我们可以使用```export```来到出一个模块对象的公有方法和属性，下面我们把刚才的helloword方法导出一下。
```js
exports.sayHello(){
    console.log('Hello World!');
}
```
   通常我们使用```module```对象可以访问到当前模块的一些相关信息，但它最多的用途是替换当前模块的导出对象。如下所示：
```js
module.exports = function () {
    console.log('Hello World!');
};
```

2.包
   从上面的知识我们大概知道了node里面模块就是一个个的js，然后多个模块则组成了一个包。在一个包的所有子模块中，通常我们需要一个入口模块，入口模块的导出对象被作为包的导出对象。如下图，则是一个标准的node程序模块图：

![clipboard.png](/img/bVYYIp)

其中index.js则是入口文件。另外，当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径。如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，并在其中指定入口模块的路径。
其内容一般如下：
```json
{
  "name": "helloword",
  "version": "1.0.0",
  "description": "node test",
  "main": "./index.js",
}
```
3. 工程目录
    看完上面的童鞋一定已经被绕晕了，完全不知道我们的工程目录结构一般到底是咋样得了。在这里重申一次，一个简单明了的目录，能够帮助开发人员更方便的阅读源码。
```
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
```

### 结语
通过上面的文章，大家应该已经知道了基础的node知识，以及能够编写并执行简单的应用了。接下来希望想学的童鞋们赶紧去恶补一下js的基础语法，下一次我们将会讲述在node中的网络操作。

另外，有童鞋问本猿有没有做过什么应用可以开源出来让大家学习的，在这里贴出两个项目:
1. [FullStack][3] --基于node.js的express模块编写的全干社区
    原本是想做一个社区的，现在暂时用来做个人网站.
2. [webwx-api][4] -- 网页版的微信API（node版）


  [1]: https://en.wikipedia.org/wiki/Node
  [2]: http://nodejs.cn
  [3]: https://github.com/wslongchen/fullstack-api
  [4]: https://github.com/wslongchen/webwx-api
