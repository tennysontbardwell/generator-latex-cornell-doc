'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

const courses = {
  'MATH 4310' : {
    'couse_name': 'Linear Algebra',
    'professor_name': 'Benjamin \\textsc{Harris}'
  },
  'MATH 4740' : {
    'couse_name': 'Stochastic Processes',
    'professor_name': 'Christian \\textsc{Noack}'
  },
  'CS 4786' : {
    'couse_name': 'Machine Learning for Data Science',
    'professor_name': 'Karthik \\textsc{Sridharan}'
  }
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    const cwd = process.cwd().split(path.sep);
    var _courses = Object.keys(courses);
    var defaultCourse = null;
    Object.keys(courses).forEach(course => {
      if (cwd.indexOf(course.replace(' ', '').toLowerCase()) > -1) {
        defaultCourse = course;
      }
    });
    if (defaultCourse != null) {
      _courses = _courses.filter(x => x != defaultCourse);
      _courses.unshift(defaultCourse);
    }
    var prompts = [
      {
        type: 'input',
        name: 'filename',
        message: 'What would you like the filename to be (no extension)?',
        default: process.cwd().split(path.sep).pop()
      },
      {
        type: 'rawlist',
        name: 'course',
        message: 'What class is this for?',
        choices: _courses
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
    var course = courses[this.props.course];
    course.course_code = this.props.course;

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
