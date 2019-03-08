<template>
    <div class="global-editor" v-show="isShow">
        <div id="cesiumContainer" class="cesium-container">
            <span id="credit"></span>
        </div>
    </div>
</template>

<script>
    import Cesium from "cesium/Cesium";

    const CESIUM_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzhjNmE3ZC0yMTJjLTQ0MmYtODIxNS1mYzM1ODk5Njg1Y2IiLCJpZCI6MzMwLCJpYXQiOjE1MjUyMjE4NjJ9.a-QHWiBZi7tnYR__ildD8YOIA5fsdkztYYQKsb4kbRw';
    // 此处viewer 不能声明为data中的参数
    let viewer, smallLayer, bigLayer;
    export default {
        name: "GlobalEditor",
        props: ['isShow'],
        mounted() {
            this.initCesiumMap();
        },
        methods: {
            initCesiumMap() {
                Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;
                const layer = new Cesium.WebMapTileServiceImageryProvider({
                    url:
                        "http://t5.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&&tk=4a00a1dc5387b8ed8adba3374bd87e5e",
                    layer: "tdtVecBasicLayer",
                    style: "default",
                    format: "image/jpeg",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    show: false
                });
                viewer = new Cesium.Viewer("cesiumContainer", {
                    timeline: false,
                    SceneModePicker: false,
                    animation: false,
                    shadows: true,
                    navigationHelpButton: false,
                    creditContainer: "credit",
                    homeButton: false,
                    fullscreenButton: false, // 全图
                    baseLayerPicker: false, // 底图快速切换
                    geocoder: false, // 搜索框
                    sceneModePicker: false, // 切换3维2维按钮
                    sceneMode: Cesium.SceneMode.SCENE3D, // 初始化模式
                    scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
                    imageryProvider: layer
                });


                let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                //鼠标移动时间回调
                handler.setInputAction(function (e) {
                    //若此标记为false，则激活对可视域分析对象的操作
                    try {
                        let last = viewer.scene.pickPosition(e.position);
                        const coord = new Cesium.Cartographic.fromCartesian(last);
                        console.log(coord);
                    } catch (e) {
                        error('绘制可视域范围鼠标移动事件错误!')
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            },

            // 设置简历底图
            setResumeMap: function () {
                let scene = viewer.scene;
                smallLayer = new Cesium.SingleTileImageryProvider({
                    url: 'http://192.168.90.135:12000/resume/256x256.png',
                    rectangle: Cesium.Rectangle.fromDegrees(118.728164, 32.039793, 119.728164, 33.039793)
                });
                scene.imageryLayers.addImageryProvider(smallLayer);

                // 设置定位点
                viewer.scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(119.228164, 32.539793, 10000000),
                });
            },

            // 放大地图
            zoomInMap: function () {
                return new Promise((resolve) => {
                    try {
                        let scene = viewer.scene;
                        setTimeout(scene.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(119.228164, 32.539793, 100000),
                        }), 3000);
                        scene.imageryLayers.remove(smallLayer, true);
                        bigLayer = new Cesium.SingleTileImageryProvider({
                            url: 'http://192.168.90.135:12000/resume/883x881.png',
                            rectangle: Cesium.Rectangle.fromDegrees(118.728164, 32.039793, 119.728164, 33.039793)
                        });
                        scene.imageryLayers.addImageryProvider(bigLayer);
                        scene.mode = Cesium.SceneMode.SCENE2D;


                    } catch (e) {
                        resolve()
                    }
                });

            }
        }
    };
</script>
<style scoped>
    .global-editor {
        position: relative;
        display: inline-block;
        top: -2em;
    }

    .cesium-container {
        width: 46vw;
        height: 94vh;
    }

    .cesium-viewer .cesium-widget-credits {
        display: none !important;

    }
</style>