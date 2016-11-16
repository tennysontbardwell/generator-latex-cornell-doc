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
        choices: ['CS 3110', 'ECE 2300', 'CS 5414', 'BTRY 3080']
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
    if (this.props.couse === 'CS 5414') {
      couse.course_code = 'CS 5414';
      couse.couse_name = 'Principles of Distributed Computing';
      couse.professor_name = 'Lorenzo Alvisi';
    }
    if (this.props.couse === 'CS 3110') {
      couse.course_code = 'CS 3110';
      couse.couse_name = 'Data Structures and Functional Programming';
      couse.professor_name = 'Michael \\textsc{Clarkson}';
    }
    if (this.props.couse === 'ECE 2300') {
      couse.course_code = 'ECE 2300';
      couse.couse_name = 'Digital Logic and Computer Organization';
      couse.professor_name = 'David \\textsc{Albonesi}';
    }
    if (this.props.couse === 'BTRY 3080') {
      couse.course_code = 'BTRY 3080';
      couse.couse_name = 'Probability Models and Inference';
      couse.professor_name = 'Florentina \\textsc{Bunea}';
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
