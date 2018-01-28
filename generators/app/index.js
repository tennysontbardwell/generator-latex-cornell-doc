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
        choices: ['CS 4780', 'CS 6850', 'CS 4120', 'MATH 3360', 'MATH 4410']
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
      },
      {
        type: 'confirm',
        name: 'minted',
        message: 'Do you want minted enabled?',
        default: false
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
      {
        filename: this.props.filename,
        minted: this.props.minted
      }
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
    this.fs.copyTpl(
      this.templatePath('template.tex'),
      this.destinationPath('template.tex'),
      {
        minted: this.props.minted
      }

    );
    var couse = {};
    if (this.props.couse === 'CS 4780') {
      couse.course_code = 'CS 4780';
      couse.couse_name = 'Machine Learning for Intelligent Systems';
      couse.professor_name = 'Kilian \\textsc{Weinberger} \\\\ \\& \\\\ Chris de \\textsc{Sa}';
    }
    if (this.props.couse === 'CS 6850') {
      couse.course_code = 'CS 6850';
      couse.couse_name = 'The Structure of Information Networks';
      couse.professor_name = 'Jon \\textsc{Kleinberg}';
    }
    if (this.props.couse === 'CS 4120') {
      couse.course_code = 'CS 4120';
      couse.couse_name = 'Introduction to Compilers';
      couse.professor_name = 'Andrew \\textsc{Myers}';
    }
    if (this.props.couse === 'MATH 3360') {
      couse.course_code = 'MATH 3360';
      couse.couse_name = 'Applicable Algebra';
      couse.professor_name = 'Allen \\textsc{Knutson}';
    }
    if (this.props.couse === 'MATH 4410') {
      couse.course_code = 'MATH 4410';
      couse.couse_name = 'Introduction to Combinatorics I';
      couse.professor_name = 'Florian \\textsc{Frick}';
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
