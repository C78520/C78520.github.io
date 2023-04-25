var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier-terser');
var htmlclean = require('gulp-htmlclean');
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
// ѹ��js
gulp.task('compress', () =>
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify().on('error', function (e) {
      console.log(e)
    }))
    .pipe(gulp.dest('./public'))
)
// ѹ��css
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .pipe(gulp.dest('./public'));
});
// ѹ��html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, 	  // ��� html ע��
            collapseWhitespace: true, // ѹ�� html
            collapseBooleanAttributes: true,
            // ʡ�Բ������Ե�ֵ�����磺<input checked="true"/> ==> <input />
            removeEmptyAttributes: true,
            // ɾ�����пո�������ֵ�����磺<input id="" /> ==> <input />
            removeScriptTypeAttributes: true,
            // ɾ��<script>��type="text/javascript"
            removeStyleLinkTypeAttributes: true,
            // ɾ��<style>��<link>�� type="text/css"
            minifyJS: true, 	// ѹ��ҳ�� JS
            minifyCSS: true, 	// ѹ��ҳ�� CSS
            minifyURLs: true 	// ѹ��ҳ�� URL
        }))
        .pipe(gulp.dest('./public'))
});

// ����gulp����ʱ����ִ����������
gulp.task('default', gulp.parallel(
  'compress', 'minify-css', 'minify-html'
))