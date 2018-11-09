/*
 * @Author: hongChuan Zhang 
 * @Date: 2018-10-10 11:35:11 
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-11-08 16:32:58
 */
//gulp  自动构建
var pkg = require("./package.json");
var inds = pkg.independents;

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify-css");
var less = require("gulp-less");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var header = require("gulp-header");
var del = require("del");
var gulpif = require("gulp-if");
var minimist = require("minimist");
// var plumber = require("gulp-plumber");
var loadPlugin = require("gulp-load-plugins")();
// var connect = require("gulp-connect");
//ts 引入
// var babel = require("gulp-babel");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var browserify = require("browserify");
var glob = require("glob");
var watchify = require("watchify");
var sourcemaps = require("gulp-sourcemaps");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tsify = require("tsify");
var paths = {
  pages: ["src/views/*.html"]
};
//获取参数
var argv = require("minimist")(process.argv.slice(2), {
    default: {
      ver: "all"
    }
  }),
  //注释
  note = [
    "/** <%= pkg.name %>-v<%= pkg.version %> <%= pkg.license %> License By <%= pkg.homepage %> */\n <%= js %>",
    { pkg: pkg, js: ";" }
  ],
  destDir = "./dist", //构建的目标目录
  releaseDir = "../pack/layuiAdmin.pack/" + pkg.name + "-v" + pkg.version, //发行版本目录
  //任务
  task = {};

//构建ts文件
gulp.task("buildTs", function() {
  browserSync.reload();
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/layuiadmin/main.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["es2015"],
      extensions: [".ts"]
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./src/layuiadmin"))
    .pipe(gulp.dest("./src/layuiadmin"));
});
gulp.task(
  "build",
  ["clear", "src", "buildTs", "mv", "layui", "mincss"],
  function() {
    //命令：gulp
    for (var key in task) {
      task[key]();
    }
  }
);

//开始构建核心源文件
gulp.task("del", function(cb) {
  //删除文件
  del("dist/*", cb);
});
gulp.task("babelModules", function(cb) {
  //
  return gulp
    .src(["src/layuiadmin/modules/**/*.js"])
    .pipe(loadPlugin.plumber()) //错误异常捕获
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      loadPlugin.babel({
        presets: ["env", "es2015"]
      })
    ) //es6 转 es5
    .pipe(header.apply(null, note))
    .pipe(uglify()) //压缩
    .pipe(sourcemaps.write("src/maps/", { addComment: true }))
    .pipe(gulp.dest("dist/layuiadmin/modules"));
});
//移动layui
gulp.task("moveLayui", function(cb) {
  gulp.src("src/layuiadmin/lib/**/*").pipe(gulp.dest("dist/layuiadmin/lib/"));
  gulp.src("src/layuiadmin/*.js").pipe(gulp.dest("dist/layuiadmin/"));
  gulp
    .src("src/layuiadmin/layui/**/*")
    .pipe(gulp.dest("dist/layuiadmin/layui/"));
});
//移动html
gulp.task("movehtml", function() {
  gulp.src("src/**/*.html").pipe(gulp.dest("dist/"));
});
//移动style 文件 压缩css
gulp.task("moveStyle", function(cb) {
  gulp
    .src(["src/layuiadmin/style/**/*", "!src/layuiadmin/style/less/**/*"])
    .pipe(gulp.dest("dist/layuiadmin/style/"));
  gulp
    .src([
      "src/layuiadmin/style/**/*.png",
      "src/layuiadmin/style/**/*.gif",
      "src/layuiadmin/style/**/*.jpg",
      "src/layuiadmin/style/**/*.img"
    ])
    .pipe(gulp.dest("dist/layuiadmin/style/"));
  gulp
    .src("src/style/**/*.css")
    .pipe(minify())
    .pipe(gulp.dest("dist/"));
});
//编译less 文件
gulp.task("less", function() {
  gulp
    .src("src/layuiadmin/style/less/**/*.less")
    .pipe(loadPlugin.plumber()) //错误异常捕获
    .pipe(less())
    .pipe(concat("index.css"))
    .pipe(minify())
    .pipe(gulp.dest("dist/layuiadmin/style/"));
});
gulp.task("babelJs", function(cb) {
  var src = [
    "./src/layuiadmin/**/*.js",
    "!src/layuiadmin/bundle.js",
    "!src/layuiadmin/modules/**/*.js",
    "!./src/layuiadmin/layui/**/*.js",
    "!./src/layuiadmin/json/**/*.js",
    "!./src/layuiadmin/config.js",
    "!./src/layuiadmin/lib/**/*.js",
    "!./src/layuiadmin/style/**/*.js"
  ];

  return gulp
    .src(src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(loadPlugin.plumber()) //错误异常捕获
    .pipe(loadPlugin.babel())
    .pipe(uglify())
    .pipe(header.apply(null, note))
    .pipe(sourcemaps.write("src/maps/", { addComment: true }))
    .pipe(gulp.dest("dist/layuiadmin"));
});
//新的 新开端口号启动热更新
gulp.task("start", function() {
  gulp.start(
    "movehtml",
    "moveLayui",
    "babelModules",
    "babelJs",
    "less",
    "moveStyle"
  );
  browserSync.init({
    port: 8089,
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
  // gulp.watch("src/js/*.js", ["script"]); //监控文件变化，自动更新
  gulp.watch(
    ["src/layuiadmin/layui/**/*", "src/layuiadmin/layui/**/*.css"],
    ["moveLayui"]
  );
  gulp.watch("src/layuiadmin/style/**/*", ["moveStyle"]);
  gulp.watch("src/layuiadmin/modules/**/*.js", ["babelModules"]);
  gulp.watch("src/layuiadmin/**/*.less", ["less"]);
  gulp.watch("src/layuiadmin/**/*.js", ["babelJs"]);
  gulp.watch(["src/views/**/*.html", "src/*.html"], ["movehtml"]);
});
//结束
