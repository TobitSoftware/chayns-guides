# Import only what you need

## Introduction

With _babel-plugin-transform-imports_ you'll get the possibility to import only the parts of your npm-packages you require.
It will decrease your bundle size. 

## Getting started

First, you need to install the package _babel-plugin-transform-imports_ via npm install.
To use the plugin, register it in your webpack base-config file.

After that, you'll have to import the definition file of the chayns-components into your config-file:  

```jsx
import resolveAbsoluteImport from 'chayns-components/lib/utils/babel/resolveAbsoluteImport';
```

Then, you simply have to add these options to your babel-loader:

```jsx
{
    loader: 'babel-loader',
    options: {
        plugins: [[BabelTransformPlugin, {
            'chayns-components': {
                transform: resolveAbsoluteImport,
                preventFullImport: true
            }
        }]]
    }
}
```

The babel loader automatically takes over all remaining plugins and presets from the .babelrc, so they do not have to be added here.
If you want to transform other plugins to minimize the bundle size, you can also import their definition files and add them to the options.

## Linting

If you use eslint in your project, it is possible that you get errors. 

This can be resolved by using the npm-package _eslint-import-resolver-webpack_. 
A nice side effect here is that external dependencies defined in webpack are correctly marked by eslint.
