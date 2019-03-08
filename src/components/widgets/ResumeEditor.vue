/*
* @Author: Du
* @Date: 2019-01-21 16:00:34
* @Last Modified by: Du
* @Last Modified time: 2019-01-21 16:45:55
*/

<template>
    <div class="resume-editor" v-if="enableHtml" ref="container">
        <!--todo resume-->
        <div class="resume-header">
            <div style="" class="header-img"><img src="../../assets/logo.png">
            </div>
            <div class="resume-header-name">
                <h1>{{this.name}}</h1>
                <div v-for="item in info" :key="item.id" class="resume-header-info">
                    <span class="header-name">{{ item.name }}:</span>
                    <span class="header-label">{{ item.label }}</span>
                </div>
            </div>
        </div>
        <h6 class="header-line"></h6>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'chaomashi',
                info: [
                    {
                        id: 'date',
                        name: '生 日',
                        label: '1993.9.24',
                    }, {
                        id: 'address',
                        name: '地 址',
                        label: '地球的某个角落'
                    }, {
                        id: 'phone',
                        name: '电 话',
                        label: '001-9527'
                    }, {
                        id: 'mail',
                        name: '邮 箱',
                        label: 'chaomashi@gmail.com'
                    }
                ]
            }
        },
        props: ['content', 'enableHtml'],
        name: "ResumeEditor",
        computed: {
            // highlightedCode: function () {
            //     return Prism.highlight(this.content, Prism.languages.css)
            // },
            // codeInStyleTag: function () {
            //     return `<style>${this.content}</style>`
            // }
        },
        methods: {
            goBottom: function () {
                this.$refs.container.scrollTop = 100000;
            },
            goTop: function () {
                this.$refs.container.scrollTop = 0;
            }
        }
    };
</script>

<style scoped>
    @media (max-width: 500px) {
        .resume-editor {
            width: 50%
        }
    }

    .resume-editor{
        position: relative;
        display:inline-block;
        top: 0%;
        left: 0;
        width: 46vw;
        height: 94vh;
        padding: .5em;
        margin: 2.5vh;
        border: 1px solid;
        background: white;
        color: #222;
        overflow: auto;
    }

    @keyframes flip {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .resume-header {
        height: 15vh;
    }

    .resume-header-info {
        height: 3.5vh;
    }

    .resume-header-name {
        position: relative;
        display: inline-block;
        width: 70%;
        top: -2em;
        margin-left: 3.5em;
    }

    .resume-header-name div {
        display: inline-block;
        position: relative;
        width: 50%;
    }

    .resume-header-info span {
        font-size: 1.5em;
    }

    .header-line {
        position: relative;
        height: 1vh;
        background-color: #043a7d;
        margin: 2em 0;
    }

    .header-name {
        font-weight: 600;
    }

    .header-label {
        margin-left: 1em;
    }

    .header-img {
        display: inline-block;
        width: 13vh;
        height: 15vh;
        margin-left: 2em;
    }
</style>
