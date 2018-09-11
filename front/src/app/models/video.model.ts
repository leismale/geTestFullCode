export class Video {
  constructor(
    public videoId: string,
    public title: string,
    public thumbnailUrl: string,
    public description: string
  ) {
    this.videoId = videoId;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.description = description;
  }
}
