'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

var path = {
        js: ['app/app.module.js',
                'app/app.dataservice.js',
                'app/totalStatisticTable/totalStatisticTable.controller.js',
                'app/totalStatisticTable/totalStatisticTable.directive.js',
                'app/timeTable/timeTable.controller.js',
                'app/timeTable/timeTable.directive.js'

        ],

        templates: ['app/totalStatisticTable/totalStatisticTable.directive.html',
                'app/timeTable/timeTable.directive.html'
        ],

        vendor: ['node_modules/angular/angular.js']
};

gulp.task('vendor', function () {
        gulp.src(path.vendor)
                .pipe(concat('vendor.js'))
                .pipe(gulp.dest('public'))
});

gulp.task('js', function () {
        gulp.src(path.js)
                .pipe(concat('app.js'))
                .pipe(gulp.dest('public'))
});

gulp.task('templates', function () {
        gulp.src(path.templates)
                .pipe(gulp.dest('public/templates'))
});



gulp.task('watch', function () {
        gulp.watch(path.templates, ['templates']);
        gulp.watch(path.js, ['js']);
        gulp.watch(path.vendor, ['js']);
});

gulp.task('default', ['vendor', 'js', 'templates', 'watch']);
