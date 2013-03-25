$(function() {
	var canvas, context, alib;

	canvas = $("#canvas")[0];
	context = canvas.getContext("2d");
	
	// Pixel data from the Amiga version of Arcade Volleyball, Copyright 1989 COMPUTE! Publications, Inc.
	var sprite1 = {
		data: [
	      0x0000,0x0000,
	      0x001A,0x000F,
	      0x00D1,0x002F,
	      0x0103,0x02FF,
	      0x04C7,0x033F,
	      0x0906,0x06FE,
	      0x1A86,0x057E,
	      0x1E52,0x01AE,
	      0x3FF3,0x000C,
	      0x3F4D,0x00B2,
	      0x37FB,0x0804,
	      0x3D41,0x02BE,
	      0x3A71,0x058E,
	      0x0FB8,0x1047,
	      0x1FC8,0x0037,
	      0x0C88,0x0377,
	      0x039B,0x0464,
	      0x02DD,0x0122,
	      0x0034,0x01CB,
	      0x0034,0x000B,
	      0x0000,0x0003,
	      0x0000,0x0001,
	      0x0000,0x0001,
	      0x0000,0x0003,
	      0x0003,0x0000,
	      0x0003,0x0003,
	      0x0007,0x0007,
	      0x0000,0x0000],
	    palette: [
          'rgba(0, 0, 0, 255)',
          'rgba(255, 136, 136, 255)',
          'rgba(204, 102, 102, 255)',
          'rgba(221, 204, 204, 255)'],
        xOffset: 16,
        yOffset: 0
	};

	var sprite2 = {
		data: [
	      0x0000,0x0000,
	      0xC000,0xC000,
	      0xC800,0xF800,
	      0xF400,0xEC00,
	      0x30F8,0x3EF8,
	      0x1986,0x167E,
	      0x1901,0x56FF,
	      0x1FA1,0x005F,
	      0x2A08,0xD5F7,
	      0x3240,0xCDBE,
	      0xF000,0x0FF8,
	      0x3800,0x07C0,
	      0x0E00,0x01C0,
	      0x8380,0x0000,
	      0xE000,0x0000,
	      0x3800,0xC000,
	      0xB600,0x4800,
	      0x6000,0x9C00,
	      0x0000,0xF800,
	      0x0000,0xE000,
	      0x0000,0x0000,
	      0x0000,0x8000,
	      0x0000,0x8000,
	      0x0000,0x0000,
	      0x0000,0x0000,
	      0x8000,0x8000,
	      0xF800,0xF800,
	      0x0000,0x0000],
	    palette: [
          'rgba(0, 0, 0, 255)',
          'rgba(255, 136, 136, 255)',
          'rgba(204, 102, 102, 255)',
          'rgba(221, 204, 204, 255)'],
        xOffset: 0,
        yOffset: 0
	};

	alib = new ASSLib();
	alib.scale = 5;
	alib.AddSprite(sprite1);
	alib.AddSprite(sprite2);

	alib.DrawSpritesToCanvas(context, 10, 0);
	var imageData = alib.DrawSpritesToImageData(context);
	context.putImageData(imageData, 0, 0);
});