const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.css$/i,//testea todos los archivos que termine con css
                use:
                [
                    {loader: miniCssExtractPlugin.loader},
                    {loader:'css-loader'},//llama al css dentro del javascript y luego es convertido junto con el código a la carpeta public
                ]            
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
                template:'./src/index.html'//relacionado donde esta el archivo principalñ
            }
        ),
        new miniCssExtractPlugin
        (
            {
                filename: 'bundle.css',
                //template:'./src/css'//ubicacion de la carpeta principal
            }
        )
    ],

    //Modo de desarrollo en este proyecto   
    mode:'development'

}