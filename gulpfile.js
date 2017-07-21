
var gulp = require("gulp");
var del = require("del");
var sequence = require("gulp-sequence");
var typescript = require("gulp-typescript");
var json = require('gulp-json-editor');

gulp.task("clean:build", function() {
    return del(["build"]);
});

gulp.task("clean:package", function() {
    return del(["package"]);
});

gulp.task("clean", sequence("clean:build", "clean:package"));

gulp.task("build", function () {
    var config = typescript.createProject("./tsconfig.json");

    return gulp
        .src("src/**/*.ts")
        .pipe(config())
        .pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
    gulp.watch("src/**/*.ts", ["build"]);
});

gulp.task("package:copy", function () {
    return gulp.src('build/**/*')
        .pipe(gulp.dest('package'));
});

gulp.task('package:license', function() {
    return gulp.src('./LICENSE')
        .pipe(gulp.dest('package'));
});

gulp.task("package:package.json", function () {
    return gulp.src('package.json')
        .pipe(json({ 'main': 'index.js', 'types': 'index.d.ts' }))
        .pipe(gulp.dest('package'));
});

gulp.task("package", sequence("clean:package", "build", "package:copy", "package:license", "package:package.json"));