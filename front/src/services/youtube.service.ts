import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { environment } from "../environments/environment";
import { map } from "rxjs/operators";

const { youtubeKey } = environment;

@Injectable()
export class YoutubeService {
  url: string = "https://www.googleapis.com/youtube/v3/"; //First part of the Url
  baseUrl: string = //Request settings
    `${this.url}` +
    "playlistItems?" +
    "part=snippet" +
    "%2CcontentDetails" +
    "%2Cstatus" +
    "&playlistId=UUTI5S0PqpgB0DbYgcgRU6QQ" +
    `&key=${youtubeKey}`;

  endPoint: string;
  nextPageToken: string;
  prevPageToken: string;
  data;

  constructor(private http: Http) {}

  getPlayList(id, results) {
    //Check if next or prev is clicked
    if (id == "next") {
      this.endPoint = this.baseUrl + `&pageToken=${this.nextPageToken}`;
    } else if (id == "prev" && this.prevPageToken != undefined) {
      this.endPoint = this.baseUrl + `&pageToken=${this.prevPageToken}`;
    }
    //The first time the request is made, we do not have next or prev page token, so we just use the base url
    if (this.nextPageToken == undefined && this.prevPageToken == undefined) {
      this.endPoint = this.baseUrl;
    }
    this.endPoint += `&maxResults=${results}`; //Add the results per page to the request

    return this.http.get(this.endPoint).pipe(
      map(res => {
        this.data = res.json();
        //Get the next and previous page token
        if (this.data.nextPageToken) {
          this.nextPageToken = this.data.nextPageToken;
        }
        if (this.data.prevPageToken) {
          this.prevPageToken = this.data.prevPageToken;
        }
        //Reset the request for the next time
        this.endPoint = this.baseUrl;
        return this.data;
      })
    );
  }
}
