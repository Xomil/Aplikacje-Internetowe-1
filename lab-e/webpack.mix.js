let mix = require('laravel-mix');
mix.ts('script.ts', 'dist').setPublicPath('dist');
mix.copyDirectory('styles', 'dist/styles');
mix.copyDirectory('images', 'dist/images');
mix.setPublicPath('dist');