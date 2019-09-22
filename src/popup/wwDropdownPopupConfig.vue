<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <wwManagerInput class="input" color="orange" v-model="result.dropdownConfig.name" label="Name"></wwManagerInput>
            </div>
            <div class="elem">
               <div class="title">Required</div>
                <wwManagerRadio class="radio" v-model="result.dropdownConfig.required"></wwManagerRadio>
            </div>
            <div class="elem">
               <div class="title">Multiple</div>
                <wwManagerRadio class="radio" v-model="result.dropdownConfig.multiple"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Placeholder</div>
                <wwManagerInput v-for="lang in langs" :key="lang" class="input" color="blue" v-model="result.dropdownConfig.placeholder[lang]" :label="lang"></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Options</div>
                <div class="option" v-for="(option, index) in result.dropdownConfig.options" :key="index">
                    <wwManagerInput class="input" :color="{ 'green': option.value.length, 'red': !option.value.length }" v-model="option.value" label="Value"></wwManagerInput>
                    <wwManagerInput v-for="lang in langs" :key="lang" class="input" color="blue" v-model="option.name[lang]" :label="lang"></wwManagerInput>
                    <wwManagerButton class="close" center color="red" @click="removeOption(index)">Remove Option</wwManagerButton>
                </div>
                <wwManagerButton class="input" center color="orange" @click="addOption">Add option</wwManagerButton>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwDropdownPopupStyle",
    props: {
        options: {
            type: Object,
            default() {
                return {
                }
            }
        },
    },
    data() {
        return {
            langs: wwLib.wwWebsiteData.getCurrentPage().langs,
            wwObject: this.options.data.wwObject,
            result: {
                dropdownConfig: {
                    name: '',
                    required: true,
                    multiple: false,
                    placeholder: {},
                    options: []
                }
            }
        };
    },
    methods: {
        init() {
            this.result.dropdownConfig.name = this.wwObject.content.data.config.name
            this.result.dropdownConfig.required = this.wwObject.content.data.config.required || false
            this.result.dropdownConfig.multiple = this.wwObject.content.data.config.multiple || false
            this.result.dropdownConfig.placeholder = this.wwObject.content.data.config.placeholder
            this.result.dropdownConfig.options = this.wwObject.content.data.config.options
            this.options.result = this.result
        },
        addOption() {
            this.wwObject.content.data.config.options.push({
                value: '',
                name: {}
            })
        },
        removeOption(index) {
            this.wwObject.content.data.config.options.splice(index, 1)
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
    }
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        padding: 20px;
        flex-wrap: wrap;
        overflow: auto;
        width: 100%;
        justify-content: center;
        font-family: "Monserrat", sans-serif;
        .elem {
            margin: 10px 33%;
            width: 33%;
            .input {
                width: 100%;
            }
            .select {
                width: 33%;
            }
            .option {
                margin-bottom: 20px;
            }
        }
        
        .title {
            color: #e02a4d;
            font-family: "Monserrat", sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>