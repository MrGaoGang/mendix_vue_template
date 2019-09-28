# mendix_vue_template
Use Vue to create mendix widgets.
[中文版](./ZH_README.md)

If you don't know the basics of mendix component development, please move to [Personal Mendix Widgets Base](https://mrgaogang.github.io/mendix/widgets/)

> Because mendix only has client in windows,so use the template must in windows.

**Project Structure**

```
├─.gitignore 
├─README.md ------------------ // README
├─ZH_README.md --------------- // 中文说明文档
├─babel.config.js 
├─build ---------------------- // Project Build Result
│ ├─HelloWorld 
│ │ ├─HelloWorld.xml 
│ │ └─widget 
│ │   ├─HelloWorld.js 
│ │   └─template 
│ │     └─HelloWorld.html 
│ ├─package.xml 
│ └─widget.mpk 
├─mendix --------------------- // Widgets demo
├─package.xml.js ------------- // Build tools
├─src ------------------------ // Project source code
│ ├─HelloMendix.xml ---------- // Mendix widgets config files
│ └─widget 
│   ├─App.vue ---------------- // Vue file
│   ├─HelloMendix.js --------- // Contact Vue file and Mendix widget config
│   └─template --------------- // HTML template
│     └─template.html 
└─webpack.config.js ---------- // webpack config
```

### 1. Install zip and git

First: I suggets you to use git bash to build the widgets.And the git download address is [click here](https://git-scm.com/downloads);
Second: install **zip and bzip2**

Go to the following link https://sourceforge.net/projects/gnuwin32/files/

Find out whatever command you are missing Here I need zip and bzip2 for zip command. 

Unzip the downloaded files Here I am downloading “zip-3.0-bin.zip” for “zip.exe” and “bzip2-1.0.5-bin.zip” for “bzip2.dll” in the bin folder. /bin/.exe

**Copy the command exe file into git-bash folder Here I am copying “zip.exe” and “bzip2.dll” to \Git\usr\bin.**




### 2. How to use it
First: download this template
Second: **Open git bash in widgets root folder**;  
Third:

```bash
npm install
npm run build
```

if you wantch buid  `production` widgets please modify webpack.config.js
```js
   mode: "development", // Change the mode do "production" before you go live! Don't forget!
    plugins: [
        // Change the plugin do "production" before you go live! Don't forget!
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"' // change to "production" when publishing your Mendix widget
            }
        }),

```




### Thanks
i am very thanks for https://intonovi.com/ inventing this component template.
The github address is [here](https://github.com/Intonovi/mendix-vuejs-widget-boilerplate)


