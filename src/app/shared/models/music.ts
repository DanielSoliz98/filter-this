
export class Artist {
  id: string;
  name: string;
  picture_medium: string;
  link: string;
}

export class Album {
  id: string;
  title: string;
  cover_medium: string;
}

export class Music {
  id: string;
  title: string;
  duration: number;
  link: string;
  preview: string;
  artist: Artist;
  album: Album;
}


