"use strict";

module.exports = function(grunt) {
  'use strict';
  var config = {
    app: 'app',
    dist: 'dist',
    test: 'test'
  };
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),
    banner: "/* */",
    // Task configuration.
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        ignores: ["Gruntfile.js","src/js/templates.js", "app/assets/config.js"]
      },
      all: ["app/assets/**/*.js"]
    },
    // handlebars: {
    //   compile: {
    //     options: {
    //       namespace: "JST",
    //       amd: true,
    //       processName: function(filePath) {
    //         return filePath.split("/templates/")[1].replace(".hbc", "");
    //       }
    //     },
    //     files: {
    //       "src/js/templates.js": "src/js/templates/**/*.hbc"
    //     }
    //   }
    // },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'app/assets/',
          dir: '',//输出路径
          name: "../../bower_components/almond/almond",
          // mainConfigFile: "app/assets/build.js",
          // insertRequire: ["app"],
          fileExclusionRegExp:'', //要排除的文件的正则匹配的表达式。
          include: ['require_main'],
          out: "build/js/app.js",
          optimize: "none", //是否进行压缩value: uglify 或者uglify2
          //CSS 代码优化方式，可选的值有
          optimizeCss: "" //-   "standard"：标准的压缩方式；-   "standard.keepLines"：保留换行；-   "standard.keepComments"：保留注释；-   "standard.keepComments.keepLines"：保留换行；-   "none"：不压缩；
        }
      }
    },
    // concat: {
    //   options: {
    //     separator: ";",
    //   },
    //   ugly: {
    //     src: ["bower_components/almond/almond.js", "build/js/app.js"],
    //     dest: "build/js/build.js"
    //   },
    //   plain: {
    //     src: ["bower_components/almond/almond.js", "build/js/app.js"],
    //     dest: "build/js/final.js"
    //   }
    // },
    uglify: {
      all: {
        files: {
          "build/js/final.js": ["build/js/build.js"]
        }
      }
    },
    clean: ["build/js/build.js", "build/js/app.js"],
    connect: {
      options: {
        port: 9001,
        hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },

      server: {
        options: {
          open: false, //自动打开网页 http://
          base: [
            'app'  //主目录
          ]
        }
      }
    },
    watch: {
      coffee: {
        files: ['app/assets/coffee/{,**/}*.coffee'],
        tasks: ['coffee:glob_to_multiple','coffee:amdConfig']
      },
      templates: {
          files: ['app/assets/coffee/**/templates/*.{tpl, html}'],
          tasks: ['copy:templates']
      },
      css: {
        files: ['app/assets/css/{,**/}*.css'],
        tasks: ['cssmin/combine']
      },
      livereload: {
        files: ['app/index.html', 'app/assets/css/{,**/}*.css', 'app/assets/js/{,**/}*.js', 'app/assets/coffee/**/templates/{,**/}*.tpl'],
        options: {
          livereload: true
        }
      }
      // jshint: {
      //   files: ["src/js/{,*/}*.js"],
      //   tasks: ["jshint"],
      //   options: {
      //     spawn: false
      //   }
      // }
    },
    // coffeescript
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        bare: false,
        cwd: 'app/assets/coffee/',
        src: ['**/*.coffee', '*.coffee'],
        dest: 'app/assets/js/',
        ext: '.js'
      },
      amdConfig: {
        flatten: true,
        options: {
          bare: true
        },
        cwd: './',
        src: ['app/assets/require_main.coffee'],
          dest: 'app/assets/require_main.js'
      }
    },
    cssmin: {
      combine: {
        options: {
          banner: '/* css for testapp v0.0.0 */'
        },
        files: {
          './app/assets/css/app.combined.css': ['app/lib/ratchet/dist/css/ratchet.css', 'app/lib/swiper/dist/css/idangerous.swiper.css', './app/assets/css/app.css'],
        }
      },
      minify: {
        cwd: './',
        src: 'app/assets/css/app.css',
        dest: 'app/css/app.min.css'
      }
    },
    copy: {
      assets: {
        expand: true,
        cwd: "src",
        src: "assets/**",
        dest: "build/"
      },
      templates: {
        files: [{
          expand: true,
          cwd: 'app/assets/coffee/',
          src: ['**/*.{tpl,html}'],
          dest: 'app/assets/js/'
        }]
      }
    },
    open: {
      dev: {
          path: 'http://localhost:9001/'
      },
      build: {
          path: 'http://localhost:9001'
      },
      testrunner: {
          path: 'http://localhost:1234/test/TestRunner.html'
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  // grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask("default", ['copy:templates','cssmin:combine', 'coffee', 'server']);
  // grunt.registerTask("default", ["jshint", "handlebars", "requirejs", "concat:plain", "clean", "copy"]);
  grunt.registerTask("build", ["jshint", "handlebars", "requirejs", "concat:ugly", "uglify", "clean", "copy"]);
  grunt.registerTask("server", ['connect:server', 'open:dev', 'watch' ]);

};
