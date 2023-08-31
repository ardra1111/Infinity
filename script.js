console.log("Welcome to Infinity");

// Intialize the variables
let songIndex = 0;
let audioElement = new Audio('0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Hey there Delilah", filePath: "1.mp3", coverPath: "a.jpg"},
    {songName: "A Thousand Years", filePath: "2.mp3", coverPath: "b.jpg"},
    {songName: "Perfect", filePath: "3.mp3", coverPath: "c.jpg"},
    {songName: "Photograph", filePath: "4.mp3", coverPath: "d.jpg"},
    {songName: "Come Home", filePath: "5.mp3", coverPath: "e.jpg"},
    {songName: "How Long Will I Love You", filePath: "6.mp3", coverPath: "f.jpg"},
    {songName: "Dandelions", filePath: "7.mp3", coverPath: "g.jpg"},
    {songName: "Like My Father", filePath: "8.mp3", coverPath: "i.jpg"},
    {songName: "Love Story", filePath: "9.mp3", coverPath: "j.jpg"},
    {songName: "Can't Help Falling In Love", filePath: "10.mp3", coverPath: "k.jpg"},
    {songName: "My Little Corner Of The World", filePath: "11.mp3", coverPath: "l.jpg"},
    {songName: "Until I found You", filePath: "12.mp3", coverPath: "m.jpg"},
    {songName: "Perfectly Imperfect", filePath: "13.mp3", coverPath: "n.jpg"},
    {songName: "If You Love Her", filePath: "14.mp3", coverPath: "o.jpg"},
    {songName: "Heaven Is a Place on Earth", filePath: "15.mp3", coverPath: "p.jpg"},
    {songName: "Growing Old With You", filePath: "16.mp3", coverPath: "q.jpg"},
    {songName: "Night Changes ", filePath: "17.mp3", coverPath: "r.jpg"},
    {songName: "18", filePath: "18.mp3", coverPath: "s.jpg"},
    {songName: "Fly Me To The Moon", filePath: "19.mp3", coverPath: "t.jpg"},
    {songName: "Something Just Like This", filePath: "20.mp3", coverPath: "u.jpg"},
    {songName: "A Million Dreams", filePath: "21.mp3", coverPath: "v.jpg"}
];

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
audioElement.src = songs[0].filePath;

function playNextSong() {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// Listen to the 'ended' event of the audio element
audioElement.addEventListener('ended', () => {
    // Automatically play the next song
    playNextSong();
});
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity =0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
     //Update Seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
     myProgressBar.value= progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
           makeAllPlays();
           
           songIndex = parseInt(e.target.id);
           e.target.classList.remove('fa-play-circle');
           e.target.classList.add('fa-pause-circle');
           audioElement.src=`${songIndex+1}.mp3`;
           masterSongName.innerText =songs[songIndex].songName;
           audioElement.currentTime = 0;
           audioElement.play();
           gif.style.opacity =1;
           masterPlay.classList.remove('fa-play-circle');
           masterPlay.classList.add('fa-pause-circle');
    })

})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=21){
        songIndex =0;
      }
      else{
        songIndex+=1
      }
      audioElement.src=`${songIndex+1}.mp3`;
      masterSongName.innerText =songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex =0;
      }
      else{
        songIndex-=1
      }
      audioElement.src=`${songIndex+1}.mp3`;
      masterSongName.innerText =songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
})