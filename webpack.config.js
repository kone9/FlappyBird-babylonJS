const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
    entry:'./src/ts/Main.ts',

    output:
    {
        filename:'bundle.js',
        path: path.resolve(__dirname,'public')
    },
    
    resolve:
    {
        extensions: ['.ts']
    },
    module:
    {
        rules:
        [
            {
                test:/\.ts?$/,
                loader:"ts-loader"
            },
            {
                exclude: '/node_modules/'
            }
        ]
    },

    plugins:
    [
        new htmlWebpackPlugin
        (
            {
                template:'./src/index.html'
            }
        )
    ],

    //Modo de desarrollo en este proyecto   
    mode:'development'

}