module.exports = {
  webpackConfigUpdater: function(config, webpack) {
    return config
  },
  verbose: true,
  port: 7777,
  publicPath: '/',
  host: 'https://imcuttle.github.io/',

  theme: 'picidae-theme-grass',
  // theme: './themes/default',

  docRoot: './source/_articles',
  distRoot: './public',
  templateRoot: './templates',
  // build过程中额外的资源，将会被复制到distRoot
  extraRoot: './extra',
  // 主题的配置根目录
  themeConfigsRoot: './theme-configs',
  excludes: [/\/ignore\//],

  transformers: [
    'picidae-transformer-react-render?' + JSON.stringify({
      lang: 'react',
      editorProps: {
        workerUrl: '/hljs.worker.js'
      },
      editable: true,
      alias: {
        'log': './mod.js',
        'mo/lib': './lib',
        'snippet': './source/_articles/snippets'
      }
    }),
    'picidae-transformer-file-syntax',
    'remark-mark',
    'picidae-transformer-style-loader?lang=css',
    './transformers/html-loader?lang=__html&dangerouslySetScript',

    './transformers/progress?' + JSON.stringify({
      progressImageUrlGetter: function progressImageUrlGetter(ele) {
        var src = ele.getAttribute('src')
        // avoid webpack load utils error parsed
        var q = String.fromCharCode(63) + 's' + '=' + '0.1'
        if (src.startsWith('https://') || src.startsWith('http://') || src.startsWith('//')) {
          return 'http://23.106.151.229:8000/resize/' + encodeURIComponent(src) + q
        }

        return 'http://23.106.151.229:8000/resize/' + encodeURIComponent(location.origin + '/' + src) + q;
      }.toString(),
      originImageUrlGetter: function originImageUrlGetter(ele) {
        return ele.getAttribute('src')
      }.toString()
    }),
    'picidae-transformer-medium-image-zoom'
  ],

  hotReloadTests: [/\/snippets\//],

  commanders: [
    // '',
    'new'
  ]
}
