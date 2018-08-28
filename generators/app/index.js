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
        name: 'course',
        message: 'What class is this for?',
        choices: ['PHYS 2213', 'MATH 3320']
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
    var course = {
      'PHYS 2213' : {
        'course_code': 'PHYS 2213',
        'couse_name': 'Physics II: Electromagnetism',
        'professor_name': 'Tomas \\textsc{Arias}'
      },
      'MATH 3320' : {
        'course_code': 'MATH 3320',
        'couse_name': 'Introduction to Number Theory',
        'professor_name': 'Brian \\textsc{Hwang} \\\\\ \\& \\\\ Dan \\textsc{Barbasch}'
      }
    }[this.props.course];

    this.fs.copyTpl(
      this.templatePath('main_file.tex'),
      this.destinationPath(this.props.filename + '.tex'),
      {
        cover_author: this.props.cover_author,
        header_author: this.props.header_author,
        title: this.props.title,
        course_code: course.course_code,
        course_name: course.couse_name,
        professor_name: course.professor_name
      }
    );
  },

  install: function () {
  }
});
