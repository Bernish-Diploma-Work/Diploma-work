import React, { useEffect, useRef } from "react";

import {
  create,
  ErrorType,
  isPlayerSupported,
  MediaPlayer,
  PlayerError,
  PlayerEventType,
  PlayerState,
  Quality,
  TextCue,
  TextMetadataCue,
} from "amazon-ivs-player";
import { mockups } from "../../../../assets/mockups/images";
import styles from "./videoPlayer.module.scss";
interface VideoPlayerProps {
  previewUrl: string;
  videoUrl: string;
  isIvsStream?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  previewUrl,
  videoUrl,
  isIvsStream = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let player: MediaPlayer;

    const createAbsolutePath = (assetPath: string) =>
      new URL(assetPath, document.URL).toString();

    if (isIvsStream && videoRef.current && isPlayerSupported) {
      try {
        const worker = createAbsolutePath("/amazon-ivs-wasmworker.min.js");
        const binary = createAbsolutePath("/amazon-ivs-wasmworker.min.wasm");
        player = create({
          wasmWorker: worker,
          wasmBinary: binary,
        });

        player.attachHTMLVideoElement(videoRef.current!);
        attachListeners(player);

        player.setAutoplay(true);
        player.load(videoUrl);
      } catch (error) {
        console.error("IVS Player error:", error);
      }
    }

    return () => {
      if (player) {
        player.delete();
      }
    };
  }, [isIvsStream, videoUrl]);

  const attachListeners = (player: MediaPlayer) => {
    for (let state of Object.values(PlayerState)) {
      player.addEventListener(state, () => {
        console.log(state);
      });
    }

    player.addEventListener(PlayerEventType.INITIALIZED, () => {
      console.log("INITIALIZED");
    });

    player.addEventListener(PlayerEventType.ERROR, (error: PlayerError) => {
      const statusTooManyRequests = 429;
      if (
        error.type === ErrorType.NOT_AVAILABLE &&
        error.code === statusTooManyRequests
      ) {
        console.error("Concurrent-viewer limit reached", error);
      } else {
        console.error("ERROR", error);
      }
    });

    player.addEventListener(
      PlayerEventType.QUALITY_CHANGED,
      (quality: Quality) => {
        console.log("QUALITY_CHANGED", quality);
      }
    );

    player.addEventListener(PlayerEventType.TEXT_CUE, (cue: TextCue) => {
      console.log("TEXT_CUE", cue.startTime, cue.text);
    });

    player.addEventListener(
      PlayerEventType.TEXT_METADATA_CUE,
      (cue: TextMetadataCue) => {
        console.log("Timed metadata", cue.text);
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      {isIvsStream ? (
        <video
          ref={videoRef}
          poster={previewUrl || mockups.defaultThumbnail}
          controls
          className={styles.player}
        />
      ) : (
        <video
          src={videoUrl}
          poster={previewUrl || mockups.defaultThumbnail}
          controls
          className={styles.player}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
