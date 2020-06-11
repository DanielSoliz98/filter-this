export interface Author {
  name: string;
}

export interface ImageLink {
  smallThumbnail: string;
  thumbnail: string;
}

export interface VolumeInfo {
  title: string;
  authors: Author[];
  publishedDate: Date;
  description: string;
  imageLinks: ImageLink;
}
export interface Book {
  id: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}
