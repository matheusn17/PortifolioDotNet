// Mudblazor não tem uma engine de audio
AudioPlayer = { };
AudioPlayer.CurrentTrack = { name_ : "No track", track : new Audio()};
AudioPlayer.AudioTracks = [ ];

AudioPlayer.LoadTrack = function (track_name){
    let new_track = false;
    this.AudioTracks.forEach(
        (e) => {
            if (e.name_ == track_name){
                new_track = e;
            }
        }   
    );
    
    if(!new_track){
        console.log("Couldn't find track");
        return false;
    }

    this.CurrentTrack.track.pause();
    this.CurrentTrack = new_track;
    this.CurrentTrack.track.currentTime = 0;
    this.CurrentTrack.track.play();
}

AudioPlayer.AddTrack = function (track){
    this.AudioTracks[this.AudioTracks.length] = {
        name_ : track.name,
        track : new Audio(track.path)
    };
}

AudioPlayer.PauseTrack = function(){
    this.CurrentTrack.track.pause();
}

AudioPlayer.PlayTrack = function(){
    this.CurrentTrack.track.play();
}

AudioPlayer.NextTrack = function(){
    let i = this.GetTrackIndex(this.CurrentTrack.name_) + 1;

    if(typeof this.AudioTracks[i] === "undefined"){
        this.LoadTrack(this.AudioTracks[0].name_);
        return;
    } else {
        this.LoadTrack(this.AudioTracks[i].name_);
        return;
    }
}

AudioPlayer.PreviousTrack = function(){
    let i = this.GetTrackIndex(this.CurrentTrack.name_) - 1;

    if (i < 0){
        this.LoadTrack(this.AudioTracks[this.AudioTracks.length - 1].name_);
        return;
    }
    else
    {
        if(typeof this.AudioTracks[i] === "undefined")
        {
            this.LoadTrack(this.AudioTracks[0].name_);
            return;
        }

        this.LoadTrack(this.AudioTracks[i].name_);
        return;
    }
}

AudioPlayer.NextTackShuffled = function(){
    let i = Math.random() * Object.keys(this.AudioTracks).length;
    i = i - (i%1);

    // Garante q a musica nao se repita
    while(this.AudioTracks[i].name_ == this.CurrentTrack.name_){
        i = Math.random() * Object.keys(this.AudioTracks).length;
        i = i - (i%1);
    }

    this.LoadTrack(this.AudioTracks[i].name_);
}

AudioPlayer.SetMusicPos = function(pos){
    pos = this.CurrentTrack.track.duration * pos / 100;
    this.CurrentTrack.track.currentTime = pos;
}

AudioPlayer.RepeatTrack = function(){
    this.SetMusicPos(0);
    this.CurrentTrack.track.play();
}

AudioPlayer.SetTrackLoop = function(l){
    this.CurrentTrack.track.loop = l;
}

// Util

AudioPlayer.GetTrackIndex = function(track_name){
    let index = 0;
    this.AudioTracks.forEach(
        (e, i) => {
            if (e.name_ == track_name){
                index = i;
            }
        }   
    );
    return index;
}