const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app =>{
    app.use(
        createProxyMiddleware('/api/texttospeech',
            {
                target: 'https://be-read-doc-automatic.vercel.app',
                changeOrigin: true,
            }
        )
    )
}