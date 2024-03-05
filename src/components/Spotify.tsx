import { useEffect, useState } from "react";

interface songData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function Spotify() {
  const [song, setSong] = useState<songData>({
    isPlaying: false,
    title: "",
    artist: "",
    album: "",
    albumImageUrl: "",
    songUrl: "",
  });

  useEffect(() => {
    async function getSpotify() {
      try {
        const response = await fetch("https://api.rcn.sh/api/spotify",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "s-maxage=1, stale-while-revalidate=59"
            },
          }
        );
        const songPromise = await response.json();

        const newSongData: songData = {
          isPlaying: songPromise.isPlaying,
          title: songPromise.title,
          artist: songPromise.artist,
          album: songPromise.album,
          albumImageUrl: songPromise.albumImageUrl,
          songUrl: songPromise.songUrl,
        };
        setSong((prevSong) => ({ ...prevSong, ...newSongData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getSpotify();
  }, []);

  return (
    <section className={"py-5 text-[#cdc8c2]"}>
      <a
        target="_blank"
        rel="noopener noreferer"
        href={
          song.isPlaying
            ? song.songUrl
            : "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj"
        }
        className="relative m-auto flex w-72 items-center space-x-4 rounded-md p-5 transition-shadow hover:shadow-md"
      >
        <div className="w-16">
          {song.isPlaying ? (
            <img
              className="w-16 shadow-sm"
              src={song.albumImageUrl}
              alt={song.album}
              width={64}
              height={64}
              loading={"lazy"}
            />
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              role="img"
              viewBox="0 0 24 24"
              color="#1ED760"
              height="64"
              width="64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="component font-bold">
            {song.isPlaying ? song.title : "Not Listening"}
          </p>
          <p className="font-dark text-xs">
            {song.isPlaying ? song.artist : "Spotify"}
          </p>
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            role="img"
            viewBox="0 0 24 24"
            color="#1ED760"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path>
          </svg>
        </div>
      </a>
    </section>
  );
}
