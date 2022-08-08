function gettingDob(){
    const today = new Date();
    const dob = document.getElementById("dob");
    const date = new Date(dob.value);
    const time = today.getTime() - date.getTime();
    const days = time/(1000 * 3600 * 24);
    return Math.floor(days/7);
}

function gettingAod(){
    const death = document.getElementById("aod");
    return death.value;
}

function toggleWeek(){
    const focus = document.querySelectorAll('.focus');
    focus.forEach(function(item){
        if(!item.classList.contains('d-none')){
            item.classList.toggle('d-none');
        }
    })
}

const timeline = document.getElementById("timeline");

window.addEventListener('mousedown', e => {
    const clickedEl = e.target;
    if (!timeline.contains(clickedEl)) {
        toggleWeek();
    }
});

function ageInWeeks(){
    const mobile_size = window.matchMedia("(max-width: 700px)");
    const weeks_passed = gettingDob();
    const death = gettingAod();
    
    if(mobile_size.matches)
        draw_mobile(weeks_passed, death);
    else{
        draw(weeks_passed, death);
    }
}

function draw(weeks_passed=100, death=100){
    timeline.innerHTML = null;
    let week_counter = 0;

    for(let y = 0; y <= death; y++){
        const year = document.createElement("div");
        year.classList.add('year');
        timeline.appendChild(year);

        for(let i = 0; i < 13; i++){
            const month = document.createElement("div");
            month.classList.add('month');
            year.appendChild(month);
            
            for(let j = 0; j < 4; j++){
                week_counter++;
                const week = document.createElement("span");
                week_counter <= weeks_passed ? week.classList.add('w-pass') : week.classList.add('week');
                month.appendChild(week);

                if(y === 0 && j === 3){
                    const week_disp = document.createElement("span");
                    week_disp.classList.add('w-disp');
                    week_disp.innerHTML = week_counter.toLocaleString("en-US", {
                        minimumIntegerDigits : 2
                    });
                    week.appendChild(week_disp);
                }

                const weeks_more = week_counter - weeks_passed;

                const tipText = document.createElement("span");
                tipText.classList.add('tooltiptext');
                tipText.innerHTML = `${weeks_more} weeks more to go`;

                week.appendChild(tipText);

                const focus = document.createElement("span");
                focus.classList.add('d-none');
                focus.classList.add('focus');
                focus.innerHTML = `Week ${week_counter} of your life`;

                week.append(focus);

                week.addEventListener("click", function(){
                    toggleWeek();
                    focus.classList.toggle('d-none');
                })
            }
        }

        const year_disp = document.createElement("span");
        year_disp.classList.add('y-disp');
        year_disp.classList.add('d-none');
        year_disp.innerHTML = y.toLocaleString("en-US", {
            minimumIntegerDigits : 2
        });

        if(y%5 === 0){
            year_disp.classList.toggle('d-none');
            year.classList.add('m-disp');
        }

        year.appendChild(year_disp);
    }
}

function draw_mobile(weeks_passed, death){
        timeline.innerHTML = null;
        const week_mobile = document.createElement('div');
        week_mobile.classList.add('week-mobile');
        timeline.appendChild(week_mobile);
        let week_counter = 0;

        for(let w = 0; w < death*52; w++){
            week_counter++;
            const week = document.createElement("span");
            week_counter <= weeks_passed ? week.classList.add('w-pass') : week.classList.add('week');
            week_mobile.appendChild(week);
        }
}