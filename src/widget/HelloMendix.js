import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';

import _TemplatedMixin from 'dijitTemplatedMixin';
import template from './template/template.html'

import Vue from 'vue';
import App from './App.vue';
import "babel-polyfill";

declare("HelloMendix.widget.HelloMendix", [widgetBase, _TemplatedMixin], {

    // Dojo uses this to create the template that we can use to attach our Vue app to.
    templateString: template,

    vueRoot: null,
    contextObj: null,
    constructor: function (params, srcNodeRef) {
        this.domNode = srcNodeRef;
    },

    update: function (obj, cb) {

        this.contextObj = obj;
        var vm = this;


        if(!this.vueRoot){//防止页面复用问题
        this.vueRoot = new Vue({
            el: this.mrgaoVueWidget,
            render: h => h(App, {
                props: {
                    widgetID: this.id
                }
            })
        });
        }
        // Emit the event that will send the data from Mendix to your App.vue file / app starting point.
        this.vueRoot.$emit('widget-loaded', {

            btnName: vm.btnName

        });

        if (this.contextObj != null) {
            var subscription = mx.data.subscribe({
                guid: this.contextObj.getGuid(),
                callback: function (guid) {
                    vm.vueRoot.$emit("widget-change");
                    console.log("Object with guid " + guid + " changed");
                }
            });
        }
        cb();

    },


});
