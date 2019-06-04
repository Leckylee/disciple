> 基于 creat-react-app v2.x 搭建的项目模版
> 技术栈

1. react
2. react-router
3. mobx
4. less(css module)

### less-modules

使用[babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules).
这里需要注意一下,`babel-plugin-react-css-modules`的配置项:`generateScopedName`,其默认值是`[path]___[name]__[local]___[hash:base64:5]`;而对应的`css-loader`配置项`localIdentName`的默认值是`[hash:base64:5]`.导致元素的类名和编译出来的 css 类名不匹配.

当前配置的`css-module`是如果直接以`.less`结尾则使用`css-module`,如果以`global.less`则使用原始的`less`.

### 打包后的资源路径

默认打包后,`index.html`文件中的资源路径都是以`/`开头的,这可能会导致引用错误.解决方法:

```
/config/paths.js

- envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
+ envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './');
```

### proxy

新版本的脚手架无法在`package.json`中使用对象形式的`proxy`.需要安装[http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)插件.然后配置`proxy`

```
cd my-project
yarn add http-proxy-middleware -D
touch setupProxy.js
```

_注意_`/setupProxy.js`这个文件的路径在`/config/paths.js`中设置.按照插件说明配置完后,重启即可自动代理
