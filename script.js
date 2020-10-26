let countdown;
const timerDisp=document.querySelector('.display__time-left');
const endTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');
function timer(seconds){
    clearInterval(countdown);
    const now=Date.now();
    const then =now+seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown= setInterval(() => {
        const secondsLeft= Math.round((then - Date.now())/1000);

        if(secondsLeft<0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}
function displayTimeLeft(seconds){
    const hours=Math.floor(seconds/3600);
    seconds=seconds%3600;
    const minutes=Math.floor(seconds/60);
    const rem=seconds%60;
    const display=`${hours<10?'0':''}${hours}:${minutes<10?'0':''}${minutes}:${rem<10?'0':''}${rem}`;
    document.title=display;
    timerDisp.textContent=display;
    console.log({hours,minutes,rem});
}
function displayEndTime(timestamp){
    const end=new Date(timestamp);
    const hour =end.getHours();
    const minutes=end.getMinutes();
    endTime.textContent=`Be Back At ${hour<10?'0':''}${hour}:${minutes<10?'0':''}${minutes}`;
    
}
buttons.forEach(button => button.addEventListener('click',strtTimer));
function strtTimer(){
    const seconds=parseInt(this.dataset.time);
    timer(seconds);
}
function pause(){
	clearInterval(countdown);
}
function resume(){
	const remtime=timerDisp.innerHTML;
	var h,m,s;
	var res=remtime.split(":");
	var con=0;
	for(var i=0;i<res.length;i++)
	{
		var t=parseInt(res[i]);
		if(i==0) con+=(t*3600);
		if(i==1) con+=(t*60);
		if(i==2) con+=t;
	}
	timer(con);
	console.log(con);
}
document.customForm.addEventListener('submit',function (e){
    e.preventDefault();
    const mins=this.minutes.value;
    console.log(mins);
    timer(mins*60);
    this.reset();
});