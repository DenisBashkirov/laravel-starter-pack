const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const clean = require('gulp-clean');

var public_dir = './../../public/';
var temp_dir = './tmp/';

var serviceSide = 'frontend'; // сторона интерфейса ('frontend' / 'backend')

const config = {
    watch: ['./**/*.sass', './**/*.scss', './**/*.js'],
    sass: {
        src: './sass/' + serviceSide + '/**/*.sass',
        dest: temp_dir
    },
    css: {
        src: temp_dir + '**/*.css',
        dest: public_dir + 'css/'
    },
    js: {
        src: './js/' + serviceSide + '/**/*.js',
        file: serviceSide + '.js',
        dest: public_dir + 'js/'
    },
    img: {
        src: './img/**/*.+(png|jpg|jpeg|gif|svg)',
        dest: public_dir + '/img/'
    },
    clean: temp_dir
};

// КОМПИЛЯЦИЯ SASS
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gcmq())
        .pipe(autoprefixer({
            grid: false,
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest(config.sass.dest));
});

// КОНКАТЕНАЦИЯ ВСЕХ .CSS В ОДИНЙ ФАЙЛ
gulp.task('css', function () {
    return gulp.src(config.css.src)
        .pipe(concat(serviceSide + '.css'))
        .pipe(gulp.dest(config.css.dest))
});

// УДАЛЕНИЕ ВРЕМЕННЫХ ФАЙЛОВ
gulp.task('clean', function () {
    return gulp.src(config.clean, {read: false})
        .pipe(clean());
});

// ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ
gulp.task('images', function(){
    return gulp.src(config.img.src)
    // кэширование изображений, прошедших через imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(config.img.dest))
});

// JS
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(concat(config.js.file))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', gulp.series('sass', 'css', 'clean'));

gulp.task('watch', function () {
    //gulp.watch(config.watch, gulp.series('sass', 'css', 'clean', 'js'));
    gulp.watch(config.watch, gulp.series('sass', 'css'));
});