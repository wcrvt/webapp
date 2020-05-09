module.exports = {
  pages: {
    index: {
      entry: 'src/entry-point/main.js', // エントリーポイントとなるjs
      template: 'public/index.html', // テンプレートのHTML
      filename: 'index.html' // build時に出力されるファイル名
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
      ]
    }
  }
}
