import { useState } from 'react'

function Video() {
  return (
    <div>
      <video className="w-full h-full" autoPlay loop muted src="https://player.vimeo.com/progressive_redirect/playback/1119600858/rendition/1080p/file.mp4?loc=external&log_user=0&signature=c4a137161d6ce80a52c50c7ee23d4fdf8df103bfc816252fc304e317a43bacc6"></video>
    </div>
  )
}

export default Video
