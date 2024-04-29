let data = {
    'A' : {
        name : 'Clap' ,
        sound : 'sounds/clap.wav',
    },
    'S' : {
        name : 'Hithat' ,
        sound : 'sounds/hithat.wav',
    },
    'D' : {
        name : 'Kick' ,
        sound : 'sounds/kick.wav' ,
    },
    'F' : {
        name : 'OpenHat' ,
        sound : 'sounds/openhat.wav' ,
    },
    'G' : {
        name : 'Boom' ,
        sound : 'sounds/boom.wav' ,
    },
    'H' : {
        name : 'Ride' ,
        sound : 'sounds/ride.wav' ,
    },
    'J' : {
        name : 'Snare' ,
        sound : 'sounds/snare.wav' ,
    },
    'K' : {
        name : 'Tom' ,
        sound : 'sounds/tom.wav' ,
    },
    'L' : {
        name : 'Tink' ,
        sound : 'sounds/tink.wav'
    }
};

let drumkit = document.getElementById("drumkit");

const construct = ()=>{
    for (let key in data){
        let drumElement = document.createElement('div');
        drumElement.classList.add('element', data[key].name);

        let h2 = document.createElement('h2');
        h2.textContent = key ;

        let span = document.createElement('span');
        span.textContent = data[key].name;

        drumElement.appendChild(h2);
        drumElement.appendChild(span);

        drumkit.appendChild(drumElement);

        drumElement.addEventListener('click' , (e) =>{
            // console.log(e.target);
            let key = e.currentTarget.querySelector('h2').textContent;
            playDrum(key.toUpperCase());
        })
    }
}

const playDrum = (key) =>{
    if (data.hasOwnProperty(key)){
        let drumElement = document.querySelector(` .element.${data[key].name}`);
        drumElement.classList.add('active');
        let audio = new Audio();
        audio.src = data[key].sound;
        audio.play();

        audio.addEventListener('timeupdate', function () {
            if (audio.currentTime >= audio.duration / 32) {
                drumElement.classList.remove('active');
                audio.removeEventListener('timeupdate', arguments.callee);
            }
        });
    }
    else{
        console.log(
            "OOPS!\nIt looks like you've pressed a key that isn't defined.\nCould you please try again with a valid key?\nThank you!"  
        );
        setTimeout(()=>{
            console.clear();

        },2000);
    }
}

const keyEvent = (e)=>{
    playDrum(e.key.toUpperCase());
}

document.addEventListener('keydown' , keyEvent);

construct();