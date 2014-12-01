var hex_pattern = /^#([0-9a-fA-F]{6})$/i;

function isHexColor(color){
    return hex_pattern.test(color);
}