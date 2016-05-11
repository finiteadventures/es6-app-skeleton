module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configure variables for use across grunt tasks
  var config = {
    dirs: {
      app: 'app',
      dev: '.dev',
      build: 'build',
    },
    files: {
      scripts: [
        '<%= config.dirs.app %>/main.js',
      ],
      tests: [
        '<%= config.dirs.app %>/**/*.spec.js'
      ]
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    // Autoprefixer tasks   - add browser specific prefixes to css
    // autoprefixer:dev     - add browser specific prefixes to css in temporary .dev directory
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.dirs.dev %>/styles/',
          src: '**/*.css',
          dest: '<%= config.dirs.dev %>/styles/'
        }]
      }
    },

    // Babel tasks    - ES6 javascript compilation
    // babel:dev      - Compile ES6 javascript files to temporary directory during development
    babel: {
      dev: {
        options: {
          sourceMap: true,
          presets: ['es2015']
        },
        files: {
          '<%= config.dirs.dev %>/main.js': config.files.scripts
        }
      }
    },

    // Clean tasks    - For erasing contents of specified directories
    // clean:dev      - Clean temporary directory created for holding compiled files during development
    // clean:build    - Clean build directory created for holding built files used for deployment
    clean: {
      dev: [config.dirs.dev],
      build: [config.dirs.build],
    },

    // Concurrent tasks   - Allow tasks to be run concurrently
    // concurrent:test    - Allow unit-tests and watch task to be run simultaneously
    concurrent: {
      test: {
        tasks: [
          'karma:concurrent',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Connect task
    // connect:livereload - Serve site on port 9000
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside.
        livereload: 35729
      },

      livereload: {
        options: {
          open: true, // open page in default browser
          middleware: function (connect) {
            return [
              connect.static(config.dirs.dev),
              connect.static(config.dirs.app)
            ];
          }
        }
      }
    },

    // Copy task      - Copy files from one directory to another
    // copy:build     - Copy files from app directory to build directory during build process
    copy: {
      build: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.dirs.app %>',
            dest: '<%= config.dirs.build %>',
            src: [
              '*.html',
              '*/**/*.html',
              '!bower_components/**/*.html',
              'assets/**/*',
            ]
          }
        ]
      }
    },

    // Filerev tasks    - Rename files for browser caching purposes
    // filerev:build    - Filerev tasks used during build process
    filerev: {
      build: {
        src: [
          '<%= config.dirs.build %>/scripts/{,*/}*.js',
          '<%= config.dirs.build %>/styles/{,*/}*.css',
          '<%= config.dirs.build %>/assets/**/*',
        ]
      }
    },

    // Filerev_replace tasks    - Replace asset names in files with new names from filerev task
    filerev_replace: {
      options: {
        assets_root: '<%= config.dirs.build %>/assets/'
      },
      compiled_assets: {
        src: [
          '<%= config.dirs.build %>/scripts/{,*/}*.js',
          '<%= config.dirs.build %>/styles/{,*/}*.css',
        ]
      },
      views: {
        options: {
          views_root: '<%= config.dirs.build %>'
        },
        src: '<%= config.dirs.build %>/**/*.html'
      }
    },

    // gh-pages task    - Push build to the gh-pages branch.
    'gh-pages': {
      options: {
        base: '<%= config.dirs.build %>',
      },
      src: ['**']
    },

    // Htmlmin tasks    - Minify html files
    // htmlmin:build    - Minify html files during build process
    htmlmin: {
      build: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dirs.build %>',
          src: ['*.html', '*/**/*.html'],
          dest: '<%= config.dirs.build %>'
        }]
      }
    },

    // Karma - test runner
    // karma:concurrent   - Run test in the background
    // karma:single       - Run tests once
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      // Keep tests running in the background
      concurrent: {
        singleRun: false
      },
      // Run tests once
      single: {
        singleRun: true
      },
      // Run only in headless browsers
      'continuous-integration': {
        singleRun: true,
        browsers: ['PhantomJS'],
      }
    },

    // Sass tasks    - SCSS and SASS compilation
    // sass:dev      - Compile .scss and .sass files to temporary directory during development
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.dirs.app %>/styles',
          src: ['**/*.{scss,sass}'],
          dest: '<%= config.dirs.dev %>/styles',
          ext: '.css'
        }]
      }
    },

    // UseminPrepare tasks  - Reads HTML for usemin blocks to enable smart builds that automatically
    //                        concat, minify and revision files. Creates configurations in memory so
    //                        additional tasks can operate on them
    // useminPrepare:build  - UseminPrepare task for build process
    useminPrepare: {
      build: {
        src: ['<%= config.dirs.app %>/index.html'],
        options: {
          staging: '<%= config.dirs.dev %>',
          dest: '<%= config.dirs.build %>',
          flow: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Usemin tasks         - Performs rewrites based on filerev and the useminPrepare configuration
    // usemin:html          - Usemin task for .html files
    // usemin:css          - Usemin task for .css files
    usemin: {
      html: ['<%= config.dirs.build %>/**/*.html'],
      css: ['<%= config.dirs.build %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= config.dirs.build %>']
      }
    },

    // Watch tasks      - Watch for changes in specified directories, and re-run specified task(s)
    // watch:babel      - Watch ES6 javascript files, re-compile ES6 javascript files
    // watch:sass       - Watch .scss and .sass files, re-compile on change
    // watch:wiredep    - Watch bower.json for new bower_components, and inject new dependencies
    // watch:livereload - Trigger livereload on update of html or scripts
    watch: {
      options: {
        livereload: true
      },

      babel: {
        files: config.files.scripts,
        tasks: ['babel:dev']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dirs.app %>/**/*.html',
          '<%= config.dirs.dev %>/**/*.js'
        ]
      },

      sass: {
        files: [
          '<%= config.dirs.app %>/styles/**/*.{scss,sass}'
        ],
        tasks: ['sass']
      },

      wiredep: {
        files: ['bower.json'],
        tasks: [
          'wiredep:dev',
          'wiredep:test',
        ]
      }
    },

    // Wiredep tasks    - Inject bower dependencies automatically into source code
    // wiredep:dev      - Inject bower dependencies into html pages and scss files
    // wiredep:test     - Inject bower dependencies into karma config
    wiredep: {
      dev: {
        src: [
          '<%= config.dirs.app %>/index.html',
          '<%= config.dirs.app %>/styles/main.scss',
        ]
      },

      test:{
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi, // Wire dependencies between '// bower:extension' and '// endbower'
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    }

  });

  // Custom tasks

  // test                     - Run a single run of unit tests
  //    [--no-install-deps]   - Skip dependency installation.
  grunt.registerTask('test', 'Run unit tests', function(){
    if(! grunt.option('no-install-deps')){
      grunt.task.run([
        'npm-install',
      ]);
    }

    var type = grunt.option('type') || 'single'

    grunt.task.run([
      'wiredep:test',
      'clean:dev',
      'babel:dev',
      'karma:' + type
    ]);
  });

  // build                    - Build app, ready for deployment
  //    [--no-install-deps]   - Skip dependency installation.
  grunt.registerTask('build', 'Build, ready for deployment', function(){
    if(! grunt.option('no-install-deps')){
      grunt.task.run([
        'npm-install',
      ]);
    }

    grunt.task.run([
      'clean:dev',
      'babel:dev',
      'wiredep:dev',
      'sass:dev',
      'autoprefixer:dev',
      'clean:build',
      'useminPrepare',
      'concat',
      'copy:build',
      'cssmin',
      'uglify',
      'filerev',
      'filerev_replace',
      'usemin',
      'htmlmin',
    ]);
  });

  // deploy                    - Build app, deploy to gh-pages branch on Github
  grunt.registerTask('deploy', 'Build app, deploy to gh-pages branch', function(){
    grunt.task.run([
      'build',
      'gh-pages',
    ]);
  });

  // serve                    - Compile site assets, serve site
  //    [--test]              - run unit tests concurrently
  //    [--no-install-deps]   - Skip dependency installation.
  grunt.registerTask('serve', 'Compile, serve, optionally run tests', function(){
    if(! grunt.option('no-install-deps')){
      grunt.task.run([
        'npm-install',
      ]);
    }

    grunt.task.run([
      'clean:dev',
      'babel:dev',
      'wiredep:dev',
      'sass:dev',
      'autoprefixer:dev',
      'connect:livereload'
    ]);

    if(grunt.option('test')){
      grunt.task.run([
        'wiredep:test',
        'concurrent:test'
      ]);
    } else {
      grunt.task.run(['watch']);
    }
  });

  // default task   - run by grunt when no task is specified
  grunt.registerTask('default', 'serve');
};
