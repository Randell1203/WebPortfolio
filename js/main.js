

/*********************************/
/*       CONSTRUCTORS	 	     */
/*********************************/

// get page total height 
const totalHeight = document.documentElement.scrollHeight;
const nameSvg = document.querySelectorAll('#svgName path');
const screenHeight= window.innerHeight;

/*********************************/
/*       ON LOAD FUNCTIONS 	     */
/*********************************/
var ms = 1;
for (var i = 0; i < nameSvg.length; i++) {

	ms+= 0.2;

	if(ms > 2 ){
		ms-=0.1;
	}

	var pathLength = nameSvg[i].getTotalLength();

	nameSvg[i].style.strokeDasharray = pathLength;
	nameSvg[i].style.strokeDashoffset = pathLength;
	nameSvg[i].style.animation = `line-anim ${ms}s ease forwards,fillAnim 1s ease forwards ${ms}s`;
}


projectsAnimation();
skillsAnimation();

/*********************************/
/*       ON CLICK EVENTS 	     */
/*********************************/

//move page down
document.getElementById("arrowDown").addEventListener("click", function(){
	// get screen height
	
	var currentScreenTopPosition = document.documentElement.scrollTop;
	var moveTo = currentScreenTopPosition + screenHeight;
  	window.scrollTo(0, moveTo);
});

//move page up
document.getElementById("arrowUp").addEventListener("click", function(){
	// get screen height
	
	var currentScreenTopPosition = document.documentElement.scrollTop;
	var moveTo = currentScreenTopPosition - screenHeight;
  	window.scrollTo(0, moveTo);
});



/*********************************/
/*       SCROLL EVENTS   	     */
/*********************************/
window.addEventListener('scroll',function(){
	removePageArrow();
	projectsAnimation();
	skillsAnimation();
});



/*********************************/
/*        FUNCTIONS 	         */
/*********************************/

function projectsAnimation(){
	var projectBox= document.querySelectorAll('.project-box');

		for(i=0 ; i < projectBox.length; i++ ){
			var position = projectBox[i].getBoundingClientRect().top;

			// even
				var animateFadeIn ='bounceInLeft';
				var animateFadeOut = 'fadeOutLeft'; 
			// odd
			if((i % 2) == 0){
				var animateFadeIn ='bounceInRight';
				var animateFadeOut = 'fadeOutRight'; 
			}

			if(position < (screenHeight/1.2) && position > -(screenHeight/2)){
				projectBox[i].classList.remove('animated', animateFadeOut);
				projectBox[i].classList.add('animated', animateFadeIn);
			}else{
				projectBox[i].classList.remove('animated', animateFadeIn);
				projectBox[i].classList.add('animated', animateFadeOut);
			}
		}
}



function skillsAnimation(){
	var skill= document.querySelectorAll('.skill-rating');
	var skillsRow= document.querySelector('.skills-row');

		var delay = 0;
		for(i=0 ; i < skill.length; i++ ){
			var position = skillsRow.getBoundingClientRect().top;

			// even
				var animateFadeIn ='bounceIn';
				var animateFadeOut = 'fadeOut'; 

				var skillElement = skill[i];
	
			if(position < (screenHeight/1.2)){
				skillElement.style.animationDelay = `${delay}s`;
				if(skillElement.classList.contains(animateFadeOut)){
					skillElement.classList.remove('animated', animateFadeOut);
				}else{
					skillElement.classList.add('animated', animateFadeIn);
				}

			}else{

				// check if class exists
				if(skillElement.classList.contains(animateFadeIn)){
					skillElement.classList.remove('animated', animateFadeIn);
				}else{
					skillElement.classList.add('animated', animateFadeOut);
					
				}
			}

			delay+=0.25;

		}
}



function removePageArrow(){
	var currentScreenTopPosition = document.documentElement.scrollTop;
	var arrowDown= document.querySelector('#arrowDown');
	arrowDown.classList.remove('d-none');
	if( currentScreenTopPosition + screenHeight == totalHeight){
		arrowDown.classList.add('d-none');
	}

	// remove top arrow
	arrowUp.classList.remove('d-none');
	if(currentScreenTopPosition < screenHeight/2){
		arrowUp.classList.add('d-none');
	}
}

