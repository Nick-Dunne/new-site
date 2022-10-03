const MSkeleton = ()=>{

return (<svg
style={{maxWidth:'100%', maxHeight:'100%'}}
  role="img"
  width="100%"
  height="100%"
  aria-labelledby="loading-aria"
  viewBox="0 0 467 130"
  preserveAspectRatio="none"
>
  <title id="loading-aria">Loading...</title>
  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    clipPath="url(#clip-path)"
    style={{fill: 'url("#fill")'}}
  ></rect>
  <defs>
    <clipPath id="clip-path">
        <rect x="140" y="8" rx="0" ry="0" width="303" height="96" /> 
        <circle cx="70" cy="59" r="55" />
    </clipPath>
    <linearGradient id="fill">
      <stop
        offset="0.599964"
        stopColor="#f3f3f3"
        stopOpacity="1"
      >
        <animate
          attributeName="offset"
          values="-2; -2; 1"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="1.59996"
        stopColor="#ecebeb"
        stopOpacity="1"
      >
        <animate
          attributeName="offset"
          values="-1; -1; 2"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="2.59996"
        stopColor="#f3f3f3"
        stopOpacity="1"
      >
        <animate
          attributeName="offset"
          values="0; 0; 3"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
    </linearGradient>
  </defs>
</svg> ) }
export default MSkeleton;