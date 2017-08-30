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
        choices: ['CS 2850', 'CS 6820', 'CS 4410', 'CS 4700', 'CS 4701', 'CS 5414', 'MATH 4310']
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
    if (this.props.couse === 'CS 2850') {
      couse.course_code = 'CS 2850';
      couse.couse_name = 'Networks';
      couse.professor_name = 'Jon \\textsc{Kleinberg} \\\\ \& \\\\ David \\textsc{Easley}';
    }
    if (this.props.couse === 'CS 6820') {
      couse.course_code = 'CS 6820';
      couse.couse_name = 'Analysis of Algorithms';
      couse.professor_name = 'Robert \\textsc{Kleinberg}';
    }
    if (this.props.couse === 'CS 4410') {
      couse.course_code = 'CS 4410';
      couse.couse_name = 'Operating Systems';
      couse.professor_name = 'Anne \\textsc{Bracy} \\\\ \& \\\\ Emin \\textsc{Sirer}';
    }
    if (this.props.couse === 'CS 4700') {
      couse.course_code = 'CS 4700';
      couse.couse_name = 'Foundations of Artificial Intelligence';
      couse.professor_name = 'Bart \\textsc{Selman}';
    }
    if (this.props.couse === 'CS 4701') {
      couse.course_code = 'CS 4410';
      couse.couse_name = 'Practicum in Artificial Intelligence';
      couse.professor_name = 'Bart \\textsc{Selman}';
    }
    if (this.props.couse === 'CS 5414') {
      couse.course_code = 'CS 5414';
      couse.couse_name = 'Distributed Computing Principles';
      couse.professor_name = 'Lorenzo \\textsc{Alvisi}';
    }
    if (this.props.couse === 'MATH 4310') {
      couse.course_code = 'MATH 4310';
      couse.couse_name = 'Linear Algebra';
      couse.professor_name = 'Michael \\textsc{Stillman}';
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
