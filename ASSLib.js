// Amiga Simple Sprite Library
function ASSLib() {
	this.totalWidth = 0;
	this.totalHeight = 0;
	this.sprites = [];
	this.scale = 1;
}

ASSLib.prototype.Reset = function() {
	this.totalWidth = 0;
	this.totalHeight = 0;
	this.sprites = [];
}

// Add a sprite to ASSLib, sprite should be an object defined as such:
// sprite = {
//   data: SimpleSprite data.
//   palette: Sprite's pallette of colors (4colors), expects colors as string "rgb(0,0,0)" or "rgba(0,0,0,0)".
//   xOffset: xOffset of this sprite.
//   yOffset: yOffset of this sprite.
// }
ASSLib.prototype.AddSprite = function(sprite) {
	this.sprites.push(sprite);
	if (sprite.xOffset + 16 > this.totalWidth) {
		this.totalWidth = sprite.xOffset + 16;
	}
	if (sprite.yOffset + (sprite.data.length - 4)/2 > this.totalHeight) {
		this.totalHeight = sprite.yOffset + (sprite.data.length - 4)/2;
	}
}

// Draw sprites to context.
ASSLib.prototype.DrawSpritesToCanvas = function(context, xOffset, yOffset) {
    var i, j, k, sprite;
    for (i = 0; i < this.sprites.length; i++) {
    	sprite = this.sprites[i];
    	// Skip first two and last two words.
	    for (j = 2; j < sprite.data.length - 2; j += 2) {
	        var colorIndices = this.GetColorIndices(sprite.data[j], sprite.data[j+1]);
	        for (k = 0; k < 16; k++) {
	            context.fillStyle = sprite.palette[colorIndices[k]];
	            context.fillRect ((k + sprite.xOffset + xOffset) * this.scale, ((j/2) + sprite.yOffset + yOffset) * this.scale, this.scale, this.scale);
	        }
	    }
	}
}

// Draw sprites to an ImageData object.
// Returns: ImageData object.
ASSLib.prototype.DrawSpritesToImageData = function(context) {
	var i, j, k, sprite, imageData, colors, offset;
	imageData = context.createImageData(this.totalWidth, this.totalHeight);

	for (i = 0; i < this.sprites.length; i++) {
    	sprite = this.sprites[i];
    	// Skip first two and last two words.
	    for (j = 2; j < sprite.data.length - 2; j += 2) {
	        var colorIndices = this.GetColorIndices(sprite.data[j], sprite.data[j+1]);
	        for (k = 0; k < 16; k++) {
	        	colors = sprite.palette[colorIndices[k]].replace(/[^\d,]/g, '').split(',');
	        	offset = (k + sprite.xOffset) * 4 + ((j/2) + sprite.yOffset) * 4 * imageData.width;
	        	imageData.data[offset] = colors[0];
	        	imageData.data[offset + 1] = colors[1];
	        	imageData.data[offset + 2] = colors[2];
	        	imageData.data[offset + 3] = (colors[3]) ? colors[3] : 255;
	        }
	    }
	}

	return imageData;
}

// Returns an array of color values for a single row in sprite.
// http://www.tbs-software.com/guide/index.php?guide=rkm_libraries.doc%2Flib_10.guide&node=10-2-2-1
// Params:
//   a: First word of sprite data row (0x0000)
//   b: Second word of sprite data row (0x0000)
// Returns
//   Array of 16 color indexes.
ASSLib.prototype.GetColorIndices = function(a, b) {
    var i, base = 1, colors = [];
    for (i = 0; i < 16; i++) {
        colors.push( (((b&base) > 0) << 1) + ((a&base) > 0) );
        base = base << 1; // Shift bit to left. 0001 -> 0010...
    }
    return colors;
}

