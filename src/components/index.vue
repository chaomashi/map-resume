/*
* @Author: Du
* @Date: 2019-01-11 10:08:18
* @Last Modified by: Du
* @Last Modified time: 2019-01-21 16:42:29
*/

<template>
    <div class="map-resume">
        <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
        <ResumeEditor ref="resumeEditor" :content="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
        <global-editor ref="globalEditor" :isShow=isShow :hasResume="hasResume"></global-editor>
    </div>
</template>
<script type="es6">
    import {StyleEditor, ResumeEditor, GlobalEditor} from "./widgets/index";
    import '../assets/variables.css'

    export default {
        name: "Index",
        components: {
            StyleEditor,
            ResumeEditor,
            GlobalEditor
        },
        data() {
            return {
                interval: 0.1,
                currentStyle: "",
                enableHtml: false,
                isShow: false,
                hasResume: false,
                fullStyle: [
                    `/*
* Author: Du
* Date: 2019-01-11 10:08:18
* mail：chaomashi@gmail.com
*
* Hello I'm Du
* 我就是来做一份地图电子简历的
*/
/* 首先先做个简历给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
.map-resume {
  color: rgb(222,222,222);
  background: rgb(0,43,54,0.8);
}
/* 文字离边框太近了 */
.style-editor {
  display:inline-block;
  left: 5vh;
  padding: .5em;
  border: 1px solid;
  overflow: auto;
  width: 90vw;
  margin: 2.5vh 5vw;
  height: 40vh;
  transition: transform 2s;
}
/* 太高了 */
.style-editor {
   top: 1em;
}
/* 代码高亮 */
.token.selector{
  color: rgb(133,153,0);
}
.token.property{
  color: rgb(187,137,0);
}
.token.punctuation{
  color: yellow;
}
.token.function{
  color: rgb(42,161,152);
}
/*滚动条设置下高度颜色*/
::-webkit-scrollbar{
	width: 10px;
	background-color: #F5F5F5;
}
/*轨道颜色阴影*/
::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}
/*滑块样式*/
::-webkit-scrollbar-thumb{
    background-color: #3366FF;
	border-radius: 10px;
	background-image: -webkit-linear-gradient(0deg,
      rgba(255, 255, 255, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.5) 75%,
      transparent 75%,
      transparent)
}
/*添加下高度*/
.style-editor {
  position:relative;
  left: 0;
  height: 94.6vh;
  overflow-y: auto;
}
/*加个动画下旋转*/
.style-editor{
  -webkit-transform: rotate(360deg);
  transform: rotateX(360deg) ;
  }
/*窄点没地方写地图了*/
.style-editor{
    width: 40vw;
    perspective:150;
}
/* 接下来开始写我的地图简历 */
`,
                    `
/* 创建一个世界
 * 添加一个世界地图
 */
 setWorld(it's world);
 set3DMap(map);
`,
                    `
/* 好像和地图简历没啥关系
 * 那加点简历
 */
 addResume(myResume)
`,
                    `



/* 有点看不清楚放大一点 */
 zoomInMap(position)
`],
                currentMarkdown: "",
                fullMarkdown: ""
            };
        },
        created() {
            this.makeResume();
        },
        mounted() {
        },
        methods: {
            makeResume: async function () {
                await this.progressivelyShowStyle(0);
                await this.progressivelyShowStyle(1);
                await this.showMapResume();
                await this.progressivelyShowStyle(2);
                await this.changeGlobalLayer();
                await this.showHtml();
                await this.progressivelyShowStyle(3);
                await this.addMapToGlobal();
            },

            // 展示简历
            showHtml: function () {
                return new Promise((resolve) => {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            console.log('开始定位');
                        }, 3000)
                    });
                    resolve()
                })
            },
            addMapToGlobal: function () {
                return new Promise((resolve) => {
                    this.$refs.globalEditor.zoomInMap();
                    resolve();
                });
            },

            // 切换地图简历
            showMapResume: function () {
                return new Promise((resolve) => {
                    this.enableHtml = false;
                    this.isShow = true;
                    resolve();
                });
            },

            // 设置电子底图
            changeGlobalLayer: function () {
                return new Promise((resolve) => {
                    this.$nextTick(() => {
                        this.$refs.globalEditor.setResumeMap()
                    });
                    resolve();
                });

            },
            // 计算字节长度计算
            progressivelyShowStyle(n) {
                return new Promise((resolve) => {
                    let interval = this.interval;
                    let showStyle = async function () {
                        let style = this.fullStyle[n];
                        if (!style) {
                            return;
                        }
                        // 计算前 n 个 style 的字符总数
                        let length = this.fullStyle
                            .filter((_, index) => index <= n)
                            .map(item => item.length)
                            .reduce((p, c) => p + c, 0);
                        let prefixLength = length - style.length;
                        if (this.currentStyle.length < length) {
                            let l = this.currentStyle.length - prefixLength;
                            let char = style.substring(l, l + 1) || " ";
                            this.currentStyle += char;

                            if (style.substring(l - 1, l) === "\n" && this.$refs.styleEditor) {
                                this.$nextTick(() => {
                                    this.$refs.styleEditor.goBottom();
                                });
                            }
                            setTimeout(showStyle, interval);
                        } else {
                            resolve();
                        }
                    }.bind(this);
                    showStyle();
                });
            }
        }
    };
</script>

<style scoped>
    .map-resume {
        position: absolute;
        min-height: 100vh;
        overflow: hidden;
        width: 100%;
    }

    * {
        box-sizing: border-box;
    }
</style>

