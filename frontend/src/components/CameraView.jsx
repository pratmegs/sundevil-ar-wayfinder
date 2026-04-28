import { forwardRef, useEffect } from "react";

const CameraView = forwardRef(function CameraView(
  { cameraError, onCameraError, onCameraReady },
  videoRef,
) {
  useEffect(() => {
    let stream;
    let isMounted = true;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        onCameraError("Camera unavailable in this browser.");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (!isMounted || !videoRef.current) {
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        onCameraReady();
      } catch (error) {
        const message =
          error instanceof Error
            ? `Camera unavailable: ${error.message}`
            : "Camera unavailable.";
        onCameraError(message);
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [onCameraError, onCameraReady, videoRef]);

  return (
    <div className="camera-view">
      <video
        ref={videoRef}
        aria-label="Live camera feed"
        autoPlay
        muted
        playsInline
      />
      {cameraError ? <div className="camera-error">{cameraError}</div> : null}
    </div>
  );
});

export default CameraView;
