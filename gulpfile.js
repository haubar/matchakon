var gulp = require('gulp'),               // 載入 gulp
gulpCoffee = require('gulp-coffee'),
gulpRename = require('gulp-rename'),
gulpUglify = require('gulp-uglify'),
gulpPug = require('gulp-pug'),
clean = require('gulp-clean'),
autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
gulpSass = require('gulp-sass');    // 載入 gulp-sass

gulp.task('watch', function () {
gulp.watch('webfile/sass/**/*.sass', ['styles']);
gulp.watch('webfile/coffeescript/**/*.coffee', ['coffee']);
gulp.watch('webfile/js/*.origin.js', ['uglify']);
gulp.watch('webfile/pug/**/*.pug', ['pug']);
});

gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: 'webfile/'
      }
    });
  
    gulp.watch(['sass/**/*.sass', 'pug/**/*.pug', 'js/**/*.js'], {cwd: 'webfile/'}, reload);
  });

gulp.task('styles', function () {
gulp.src('webfile/sass/**/*.sass')    // 指定要處理的 Scss 檔案目錄
    .pipe(gulpSass({          // 編譯 Scss
            outputStyle: 'compressed'
        }))         
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('webfile/css-extend'))  // 指定編譯後的 css 檔案目錄
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('coffee', function() { //'coffee'是排程名稱，可自定
gulp.src('webfile/coffeescript/**/*.coffee') //來源檔案
    .pipe(gulpCoffee()) //編譯
    .pipe(gulpRename({ extname: '.origin.js' }))
    .pipe(gulp.dest('webfile/js')) //輸出位置
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('uglify', function(){
gulp.src('webfile/js/*.origin.js')
    .pipe(gulpUglify())
    .pipe(gulpRename({ extname: '.min.js' }))
    .pipe(gulp.dest('webfile/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('pug', function(){
gulp.src('webfile/pug/**/*.pug')
    .pipe(gulpPug({pretty: true}))
    .pipe(gulp.dest('webfile/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task("clean", function(){
    gulp.src("webfile/",{read: false})
     .pipe(clean());
});