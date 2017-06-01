var path = require('path');
var webpack = require('webpack');
module.exports ={
    entry:{
        index:'./public/javascript/index.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.js',
    },
    module:{
        loaders:[
            {test:/\.js[x]?$/,loaders:['babel-loader']},
            {test:/\.css$/,loader:'style-loader!css-loader'},
            {test:/\.scss$/,loader:'style!css!sass'},
            {test:/\.html$/,loader:'raw-loader'}
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jquery":"jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     template:'index.html'
        // })
    ]
}
