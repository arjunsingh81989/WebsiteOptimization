//Grunt is just JavaScript running in node, after all...
module.exports = function(grunt) {

  grunt.initConfig({
   
    pkg: grunt.file.readJSON('package.json'),

	 uglify:
	  {
		 
		  my_target:
		  {
			  files:
			  [
				  {
					  expand: true,
					  cwd: 'js/',
					  src: ['*.js'],
					  dest: 'js/',
					  ext: '.min.js'
					  
				  },
				  
				  {
					  expand: true,
					  cwd: 'views/js/',
					  src: ['*.js'],
					  dest: 'views/js/',
					  ext: '.min.js'
				  }
			  ]
				  
			  
		  }
	  },

	 cssmin:
	  {
		  my_target:
		  {
			  files:
			  [
				  {
					  expand: true,
					  cwd: 'css/',
					  src: ['*.css'],
					  dest: 'css/',
					  ext: '.min.css'
				  },
				  
				  {
					  expand: true,
					  cwd: 'views/css/',
					  src: ['*.css'],
					  dest: 'views/css/',
					  ext: '.min.css'				  
				  }
			  ]  
		  }  
	  }
	  
	  

  }); 

  
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-uglify');
	
};