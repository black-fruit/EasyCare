process.once("loaded",(()=>{const o=require("electron").webFrame,e=require("../components/SystemInfo");o.setVisualZoomLevelLimits(1,1),o.setZoomFactor(e.zooms[0]),window.zooms=e.zooms}));