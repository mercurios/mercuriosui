var js = [
    './components/jquery/dist/jquery.min.js',
    './src/js/*.js'
];

var css = [
    './src/css/*.css'
];

// Núcleo do Gulp
var gulp = require('gulp');

// Transforma o javascript em formato ilegível para humanos
var uglify = require('gulp-uglify');

// Agrupa todos os arquivos em um
var concat = require('gulp-concat');

// Verifica alterações em tempo real, caso haja, compacta novamente todo o projeto
var watch = require('gulp-watch');

// Minifica o CSS
var cssmin = require('gulp-cssmin');

// Remove comentários CSS
var stripCssComments = require('gulp-strip-css-comments');

// Tarefa de minificação do Javascript
gulp.task('minify-js', function () {
    gulp.src(js)                        // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('mercuriosui.min.js'))      // Arquivo único de saída
    .pipe(uglify())                     // Transforma para formato ilegível
    .pipe(gulp.dest('./dist/js/'));          // pasta de destino do arquivo(s)
});

// Processo que agrupará todos os arquivos CSS, removerá comentários CSS e minificará.
gulp.task('minify-css', function(){
    gulp.src(css)
    .pipe(concat('mercuriosui.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'));
});

// Tarefa padrão quando executado o comando GULP
gulp.task('default', ['minify-js', 'minify-css']);

// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minify-js']);
    gulp.watch(css, ['minify-css']);
});