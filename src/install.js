import Pressure from 'pressure';
export let _Vue;

export function install(Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    _Vue = Vue;

    // 注册自定义指令
    Vue.directive('pressure-press', {
        bind: function(el, binding) {
            // 执行绑定
            if (!el.dataset.pressureBind) {
                Pressure.set(el, {
                    change: function(force, event) {
                        // this is called every time there is a change in pressure
                        // 'force' is a value ranging from 0 to 1
                        if (force > 0.9) {
                            // 这是函数
                            binding.value && typeof binding.value === 'function' && binding.value();
                        }
                    },
                });
                el.dataset.pressureBind = 'true';
            }
        },
    });
};