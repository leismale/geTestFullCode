import { Component } from "@angular/core";
import { YoutubeService } from "../../services/youtube.service";
import { Http } from "@angular/http";
import { Video } from "../models/video.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  videos = [];
  results = [10, 25, 50]; //Options to select the number of results
  result = 10; //Set default results to 10

  constructor(private yotubeService: YoutubeService, private http: Http) {
    this.getPlayList("start", this.result); //Get the videos when the component loads
  }

  getPlayList(id, results) {
    this.result = results;
    this.videos = []; //Clear the array to show only the requested videos

    this.yotubeService.getPlayList(id, results).subscribe(res => { //Request the videos to the service and push them into the array
      res.items.map(video => {
        this.videos.push(
          new Video(
            video.contentDetails.videoId,
            video.snippet.title,
            video.snippet.thumbnails.medium.url,
            video.snippet.description
          )
        );
      });
    });
  }
}
