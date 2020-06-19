const path=require('path');

const HtmlWebpackPlugin =require('html-webpack-plugin');

module.exports={
    entry:{
        index:"./src/pages/index/index.tsx",
    },


    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,'dist')
    },

    devtool:'source-map',

    resolve:{
        modules:["node_modules"],
        alias:{
            comp_path:path.resolve(__dirname,'src/component')
        },
        extensions:['.ts','.tsx','.js','.json']
    },

    module:{
        rules:[
            {
                //详细loader配置
                    test: /\.css$/,
                    use:[
                        //use执行顺序从后往前
                    //创建style标签，将js中的样式插入添加到head
                        'style-loader',
                        //将css文件编程commonjs模块加载到js中，内容为样式字符串
                        'css-loader'
                    ]
                },{
                    test:/\.(jpg|png|gif)$/,
                    loader:'url-loader',
                    options:{
                        //图片大小小于8kb，会被base64处理
                        limit: 8 * 1024,
                        //esModule:false
                        name:'[hash:10].[ext]'
                    }
                },
                {
                    test:/\.html$/,
                    loader:'html-loader'
    
                },
            {
                test:/\.tsx?$/,loader:"awesome-typescript-loader"
            },

            {
                enforce:"pre",test:/\.js$/,loader:"source-map-loader"
            }
        ]
    },

    // externals:{
    //     "react":"React",
    //     "react-dom":"ReactDOM"
    // },

    mode: 'development',
    
    
    plugins:[
        //详细plugins配置
        new HtmlWebpackPlugin({
            title:'index',
            filename:'index.html',
            template:"./src/pages/index/index.html",
            chunks:['index']
            
        })
        
        // new HtmlWebpackPlugin({
        //     title:'Login',
        //     filename:'login.html',
        //     template:"./src/pages/login/login.html",
        //     chunks:['login']
        // })
    ],

    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        compress:true,
        port:3000,
        open:true,
        hot:true,
        overlay:true,
        //host:"0.0.0.0",
        index:"./index.html"

    }


};