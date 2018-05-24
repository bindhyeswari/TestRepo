
/**
 * @desc Calculate the character width using a canvas element
 *
 * @param {Object} canvasElement
 * @param {Array} chars An array of characters e.g. ['a', 'e' ... ]
 * @param {String} fontFamily e.g. 'Arial'
 * @param {Number} fontSizeInPixels
 * */
const calculateWidthOfCharacters = (canvasElement, chars, fontFamily, fontSizeInPixels) => {
	const context = canvasElement.getContext('2d');
	context.font = `${fontSizeInPixels}px ${fontFamily}`;
	return new Map(chars.map(c => [c, context.measureText(c).width]));
};


/**
 * @desc Get the indices where the width of the element crosses a threshold
 *   width.
 *
 * @param {String} inputStr
 * @param {Number} thresholdWidth
 * @param {Object} canvasElement
 * @param {String} fontFamily
 * @param {Number} fontSizeInPixels
 * */
const getBreakIndices = (inputStr, thresholdWidth, canvasElement, fontFamily, fontSizeInPixels) => {
    const charSet = new Set(inputStr);
    const widthMap = calculateWidthOfCharacters(canvasElement, [...charSet], fontFamily, fontSizeInPixels);
    const breakIndices = [],
          len = inputStr.length;
    let i = 0,
        iWidth = 0;
    for (i = 0; i < len; i++) {
    	iWidth += widthMap.get(inputStr[i]);
	    if (iWidth > thresholdWidth) {
    		breakIndices.push(i);
    		iWidth = 0;
	    }
    }
    return breakIndices;
};


/**
 * @desc Calculate the character width using a canvas element
 *
 * @param {String} inputStr
 * @param {Array} indices An array of indices to insert the char at
 * @param {String} stringToInsert  
 * */
const insertCharsIntoIndices = (inputStr, indices, stringToInsert) => {
	let ret = '', lastCharIndex = 0;
    indices.forEach((charIndex, i) => {
    	ret += inputStr.slice(lastCharIndex, charIndex + 1) + stringToInsert;
    	lastCharIndex = charIndex;
    });
    ret += inputStr.slice(lastCharIndex);
    return ret;
};