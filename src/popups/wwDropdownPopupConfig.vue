<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <wwManagerInput class="input" color="orange" v-model="result.config.name" label="Name" />
            </div>
            <div class="elem">
                <div class="title">Required</div>
                <wwManagerRadio class="radio" v-model="result.config.required" />
            </div>
            <div class="elem">
                <div class="title">Multiple</div>
                <wwManagerRadio class="radio" v-model="result.config.multiple" />
            </div>
            <div class="elem">
                <div class="title">Placeholder</div>
                <wwManagerInput
                    v-for="lang in langs"
                    :key="lang"
                    class="input"
                    color="blue"
                    v-model="result.config.placeholder[lang]"
                    :label="'Placeholder - ' + lang.toUpperCase()"
                />
            </div>
            <div class="elem">
                <div class="title">Texte</div>
                <div class="elem-row">
                    <wwManagerColorSelect :value="result.style.color" @change="result.style.color = $event" />
                    <wwManagerSlider
                        class="slider"
                        :options="fontSizeOptions"
                        :value="result.style.fontSize"
                        @change="result.style.fontSize = $event"
                    />
                    <div class="value">{{ result.style.fontSize }} rem</div>
                </div>
            </div>
            <div class="elem options">
                <div class="title">Options</div>
                <div class="options">
                    <div class="option" v-for="(option, index) in result.config.options" :key="index">
                        <div class="option-title">Option {{ index + 1 }} :</div>
                        <wwManagerInput
                            class="input"
                            :color="{ green: option.value.length, red: !option.value.length }"
                            v-model="option.value"
                            label="Value"
                        />
                        <wwManagerInput
                            v-for="lang in langs"
                            :key="lang"
                            class="input"
                            color="blue"
                            v-model="option.name[lang]"
                            :label="'Options - ' + lang.toUpperCase()"
                        />
                        <wwManagerButton class="remove" center color="red" @click="removeOption(index)">
                            Remove Option
                        </wwManagerButton>
                    </div>
                </div>
                <wwManagerButton class="input add-option" center color="orange" @click="addOption">
                    Add option
                </wwManagerButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wwDropdownPopupStyle',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            langs: wwLib.wwWebsiteData.getCurrentPage().langs,
            content: this.options.data,
            fontSizeOptions: {
                min: 0,
                max: 5,
                digits: 1,
            },
            result: {
                style: {
                    color: 'black',
                    fontSize: 1,
                },
                config: {
                    name: '',
                    required: true,
                    multiple: false,
                    placeholder: {},
                    options: [],
                },
            },
        };
    },
    methods: {
        init() {
            this.result.config.name = this.content.config.name;
            this.result.config.required = this.content.config.required || false;
            this.result.config.multiple = this.content.config.multiple || false;
            this.result.config.placeholder = this.content.config.placeholder;
            this.result.config.options = this.content.config.options;
            this.result.style.color = this.content.style.color;
            this.result.style.fontSize = this.content.style.fontSize;
            this.options.result = this.result;
        },
        addOption() {
            this.content.config.options.push({
                value: '',
                name: {},
            });
        },
        removeOption(index) {
            this.content.config.options.splice(index, 1);
        },
    },
    created() {
        this.init();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        padding: 20px;
        flex-direction: column;
        overflow: auto;
        width: 100%;
        align-items: center;
        font-family: 'Monserrat', sans-serif;
        .elem-row {
            display: flex;
            align-items: center;
        }
        .elem {
            margin: 10px 0;
            width: 90%;
            @media (min-width: 992px) {
                width: 40%;
            }
            .input {
                width: 100%;
            }
            .input + .input {
                margin-top: 5px;
            }
            .select {
                width: 33%;
            }
            .slider {
                flex-basis: 70%;
            }
            .option {
                margin-bottom: 20px;
            }

            &.options {
                width: 90%;

                .add-option {
                    width: 200px;
                }

                .options {
                    width: 100%;
                    display: flex;
                    margin-top: 20px;
                    flex-wrap: wrap;

                    .option {
                        width: 100%;
                        padding: 10px;
                        @media (min-width: 992px) {
                            width: 50%;
                        }

                        .option-title {
                            font-size: 18px;
                            margin-bottom: 10px;
                        }

                        .remove {
                            width: 200px;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }

        .title {
            color: #e02a4d;
            font-family: 'Monserrat', sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>
