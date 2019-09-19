import { Component, OnInit } from '@angular/core';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  files: Array<any> = [];

  state: StreamState

  currentFile: any = {};

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
    ) {
      cloudService.getFiles().subscribe(files => {
        this.files = files;
      });

      this.audioService.getState().subscribe(state => {
        this.state = state;
      });
    }

    playStream(url) {
      this.audioService.playStream(url)
      .subscribe(events => {
        // listening for fun here
      });
    }

    openFile(file, index) {
      this.currentFile = { index, file };
      this.audioService.stop();
      this.playStream(file.url);
    }
    pause() {
      this.audioService.pause();
    }

    play() {
      this.audioService.play();
    }
    stop() {
      this.audioService.stop();
    }
    next() {
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file, index);
    }

    previous() {
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openFile(file, index);
    }
    isFirstPlaying() {
      return this.currentFile.index === 0;
    }
    isLastPlaying() {
      return this.currentFile.index === this.files.length - 1;
    }
    onSliderChangeEnd(change) {
      this.audioService.seekTo(change.value);
    }

  ngOnInit() {
  }

}
