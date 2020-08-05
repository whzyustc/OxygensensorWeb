const path=require('path');

const HtmlWebpackPlugin =require('html-webpack-plugin');

module.exports={
    entry:{
        index:"./src/pages/index/index.ts",
    },


    output:{
        filename:"[name].[hash:8].js",
        path:path.resolve(__dirname+'/../OxygenSensorServer/dist')
    },

    devtool:'source-map',

    //externals:["react"],

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
        index:"./index.html",
        // before:function(app){
        //     const bodyParser=require('body-parser');
        //     const moment= require('moment');

        //     const mysql=require('mysql');
        //     const connection = mysql.createConnection({
        //         host:'localhost',
        //         user:'oxygensensor',
        //         password:'\$Ano2012',
        //         database:'oxygencon'
        //     })
            
        //     connection.connect();

        //     app.use(bodyParser.json());
        //     app.use(bodyParser.urlencoded({ extended: false }));

            
        //     app.get('/last60s',function(req,res){
        //         connection.query(`select * from test2 order by date desc limit 100 `,function(err,results,fields){
        //             if (err) throw err;
        //             console.log(results);
        //             res.send(results);
        //         });
        //     })

        //     app.get('/datafromdate',function(req,res){
        //         connection.query(`select * from test2 limit 100 `,function(err,results,fields){
        //             if (err) throw err;
        //             console.log(results[0]);
        //             res.send(results[0]);
        //         });
        //     })

        //     app.post('/post',function(req,res){
                
        //         let current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        //         connection.query(`insert into test2
        //             (date,oxygenValue)
        //             values
        //             ("${current_time}",${req.body.hello.substring(0,3)})
        //             ;`);
        //         res.send("post success");
        //         console.log(req.body);

        //     })

        // }
    }


};