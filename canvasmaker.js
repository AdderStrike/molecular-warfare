const contextOptions = { willReadFrequently: true };
const ctx = document.querySelectorAll("canvas")[0].getContext('2d', contextOptions);
ctx.beginPath();

let layerShow = new Uint8ClampedArray(4096*4);
for (let i=0;i<(4096*4);i++){
    let intGiven = 0
    if ((i+1)%4==0){
        intGiven = 255;
    }
    layerShow[i]=intGiven;
}
ctx.putImageData(new ImageData(layerShow,64,64), 0,0);

let layer0=[];
for (let i=0;i<64;i++){
    for (let j=0;j<64;j++){
        let givenCell = [127,127,127,255];
        if (i%8==0||j%8==0) givenCell = [63,63,63,255];
        layer0.push(...givenCell);
    }
}

function canvasDraw(){
    let givenPixelArray = ctx.getImageData(0,0,64,64).data;
    for (let i=0;i<4096;i++){
        if (!(givenPixelArray[i*4]==layerShow[i*4]&&givenPixelArray[i*4+1]==layerShow[i*4+1]&&givenPixelArray[i*4+2]==layerShow[i*4+2])){
            givenPixelArray[i*4] = layerShow[i*4];
            givenPixelArray[i*4+1] = layerShow[i*4+1];
            givenPixelArray[i*4+2] = layerShow[i*4+2];
        }
    }

    ctx.putImageData(new ImageData(givenPixelArray,64,64), 0,0);
}

layerShow = layer0;
setTimeout(canvasDraw,2000);

