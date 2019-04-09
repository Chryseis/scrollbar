/**
 * Created by Administrator on 2017/11/9.
 */

module.exports = ({file, options, env}) => ({
    plugins: [
        require('autoprefixer')({
            browsers: ["Firefox >= 20",
                "Safari >= 6",
                "Explorer >= 9",
                "Chrome >= 12",
                "ChromeAndroid >= 4.0",
                "iOS >= 6"]
        }),
        require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*', '!letter-spacing']
        })
    ]
});