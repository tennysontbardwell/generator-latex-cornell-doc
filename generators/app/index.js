'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var prompts = [
      {
        type: 'input',
        name: 'filename',
        message: 'What would you like the filename to be (no extension)?',
        default: 'assignment'
      },
      {
        type: 'rawlist',
        name: 'couse',
        message: 'What class is this for?',
        choices: ['CS 4850', 'CS 4820']
      },
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of this document?'
      },
      {
        type: 'input',
        name: 'cover_author',
        message: 'What should the name on the cover be?',
        default: 'Tennyson T \\textsc{Bardwell}\\\\(ttb33)'
      },
      {
        type: 'input',
        name: 'header_author',
        message: 'What should the name on the header be?',
        default: 'Tennyson T Bardwell (ttb33)'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      return props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('Makefile'),
      this.destinationPath('Makefile'),
      {filename: this.props.filename}
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('cover_page.tex'),
      this.destinationPath('cover_page.tex')
    );
    this.fs.copy(
      this.templatePath('images/cu.png'),
      this.destinationPath('images/cu.png')
    );
    this.fs.copy(
      this.templatePath('template.tex'),
      this.destinationPath('template.tex')
    );
    var couse = {};
    if (this.props.couse === 'CS 4850') {
      couse.course_code = 'CS 4850';
      couse.couse_name = 'Mathematical Foundations for the Information Age';
      couse.professor_name = 'John \\textsc{Hopcroft}';
    }
    if (this.props.couse === 'CS 4820') {
      couse.course_code = 'CS 4820';
      couse.couse_name = 'Introduction to Algorithms';
      couse.professor_name = 'Éva \\textsc{Tardos}';
    }
    this.fs.copyTpl(
      this.templatePath('main_file.tex'),
      this.destinationPath(this.props.filename + '.tex'),
      {
        cover_author: this.props.cover_author,
        header_author: this.props.header_author,
        title: this.props.title,
        course_code: couse.course_code,
        course_name: couse.couse_name,
        professor_name: couse.professor_name
      }
    );
  },

  install: function () {
  }
});
