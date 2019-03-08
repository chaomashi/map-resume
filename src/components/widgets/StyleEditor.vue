<template>
    <div class="style-editor" ref="container">
        <div class="code" v-html="codeInStyleTag"></div>
        <pre class="" v-html="showCode"></pre>
    </div>
</template>

<script>
    import Prism from 'prismjs'

    export default {
        name: 'Editor',
        props: ['code'],
        computed: {
            showCode: function () {
                return Prism.highlight(this.code, Prism.languages.css)
            },
            codeInStyleTag: function () {
                return `<style>${this.code}</style>`
            }
        },
        methods: {
            goBottom() {
                this.$refs.container.scrollTop = 100000
            }
        }
    }
</script>
