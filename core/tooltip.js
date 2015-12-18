/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Library to create tooltips for Blockly.
 * First, call Blockly.Tooltip.init() after onload.
 * Second, set the 'tooltip' property on any SVG element that needs a tooltip.
 * If the tooltip is a string, then that message will be displayed.
 * If the tooltip is an SVG element, then that object's tooltip will be used.
 * Third, call Blockly.Tooltip.bindMouseEvents(e) passing the SVG element.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Tooltip');

goog.require('goog.dom');


/**
 * Is a tooltip currently showing?
 */
Blockly.Tooltip.visible = false;

/**
 * Maximum width (in characters) of a tooltip.
 */
Blockly.Tooltip.LIMIT = 50;

/**
 * PID of suspended thread to clear tooltip on mouse out.
 * @private
 */
Blockly.Tooltip.mouseOutPid_ = 0;

/**
 * PID of suspended thread to show the tooltip.
 * @private
 */
Blockly.Tooltip.showPid_ = 0;

/**
 * Last observed X location of the mouse pointer (freezes when tooltip appears).
 * @private
 */
Blockly.Tooltip.lastX_ = 0;

/**
 * Last observed Y location of the mouse pointer (freezes when tooltip appears).
 * @private
 */
Blockly.Tooltip.lastY_ = 0;

/**
 * Current element being pointed at.
 * @private
 */
Blockly.Tooltip.element_ = null;

/**
 * Once a tooltip has opened for an element, that element is 'poisoned' and
 * cannot respawn a tooltip until the pointer moves over a different element.
 * @private
 */
Blockly.Tooltip.poisonedElement_ = null;

/**
 * Horizontal offset between mouse cursor and tooltip.
 */
Blockly.Tooltip.OFFSET_X = 0;

/**
 * Vertical offset between mouse cursor and tooltip.
 */
Blockly.Tooltip.OFFSET_Y = 10;

/**
 * Radius mouse can move before killing tooltip.
 */
Blockly.Tooltip.RADIUS_OK = 10;

/**
 * Delay before tooltip appears.
 */
Blockly.Tooltip.HOVER_MS = 1000;

/**
 * Horizontal padding between tooltip and screen edge.
 */
Blockly.Tooltip.MARGINS = 5;

/**
 * The HTML container.  Set once by Blockly.Tooltip.createDom.
 * @type Element
 */
Blockly.Tooltip.DIV = null;

Blockly.Tooltip.lastSelectedBlockType = null;
Blockly.Tooltip.lastSelectedBlockID = null;
/**
 * Create the tooltip div and inject it onto the page.
 */
Blockly.Tooltip.createDom = function() {
  if (Blockly.Tooltip.DIV) {
    return;  // Already created.
  }
  // Create an HTML container for popup overlays (e.g. editor widgets).
  Blockly.Tooltip.DIV = goog.dom.createDom('div', 'blocklyTooltipDiv');
  document.body.appendChild(Blockly.Tooltip.DIV);
};

/**
 * Binds the required mouse events onto an SVG element.
 * @param {!Element} element SVG element onto which tooltip is to be bound.
 */
Blockly.Tooltip.bindMouseEvents = function(element) {
  Blockly.bindEvent_(element, 'mouseover', null, Blockly.Tooltip.onMouseOver_);
  Blockly.bindEvent_(element, 'mouseout', null, Blockly.Tooltip.onMouseOut_);
  Blockly.bindEvent_(element, 'mousemove', null, Blockly.Tooltip.onMouseMove_);
  Blockly.bindEvent_(element, 'mousedown', null, Blockly.Tooltip.onMouseDown_);
};
Blockly.Tooltip.onMouseDown_ = function(e){
    if (!Blockly.isRightButton(e)) {
	Blockly.Tooltip.deleteAutoInsertedBlock();
	return;
    }
    var element = e.target;

    while (!goog.isString(element.tooltip) && !goog.isFunction(element.tooltip)) {

	element = element.tooltip;
    }
    if(!element.workspace.isFlyout){
	return;
    }
    Blockly.Tooltip.lastSelectedBlockID = null;
    e.stopPropagation();
}

Blockly.Tooltip.deleteAutoInsertedBlock = function(){
    if(Blockly.Tooltip.lastSelectedBlockID){
	var workspace = Blockly.getMainWorkspace();
	var lastSelectedBlock = workspace.getBlockById(Blockly.Tooltip.lastSelectedBlockID);
	var inputBlock = lastSelectedBlock.childBlocks_[0];
	if(lastSelectedBlock.parentBlock_ == null){
	    inputBlock.setParent(null);
	    lastSelectedBlock.dispose(true);
	    Blockly.Tooltip.lastSelectedBlockID = null;
	    Blockly.Tooltip.lastSelectedBlockType = null;
	    return;
	}
	var parentBlock = lastSelectedBlock.parentBlock_;
	var parentBlockOutputPos = null;
	if ( parentBlock.inputList.length > 1 ) {
	    var connectionList = parentBlock.getConnections_(false);
	    console.log(connectionList);
	    for(var i = 0; i < parentBlock.inputList.length;++i){
		if(parentBlock.inputList[i].connection.targetConnection!=null){
		    if(parentBlock.inputList[i].connection.targetConnection.sourceBlock_.id == lastSelectedBlock.id){
			parentBlockOutputPos = parentBlock.inputList[i].connection;
		    }
		}
	    }
	}
	//return;

	lastSelectedBlock.setParent(null);
	inputBlock.setParent(null);
	// Connect
        var inputConne = inputBlock.getConnections_(false)[0]; // input
	var oppositeType = Blockly.OPPOSITE_TYPE[inputConne.type];
        for(var i = 0; i < inputConne.dbList_[oppositeType].length;++i){
	    var T = inputConne.dbList_[oppositeType][i];
	    if(T.sourceBlock_.type == "output"){
		break;
	    }
	}
	if(Blockly.selected == null){
	    var outConne = inputConne.dbList_[oppositeType][i]; //output
	    inputConne.connect(outConne);
	}else{
	    lastSelectedBlock.dispose();
	    var parentConne = parentBlock.getConnections_(false)[0];
	    console.log(parentBlock);
	    console.log(parentBlock.getConnections_(false));
	    if(parentBlockOutputPos!=null){
		parentBlockOutputPos.connect(inputConne);
	    }else{
		var connection = Blockly.Connection.singleConnection_(
		    parentConne.sourceBlock_,
		    inputConne.sourceBlock_);
		try{
		    connection.connect(inputConne)
		}catch(e){
		    console.log("Error",e);
		}
	    }
	}

	lastSelectedBlock.dispose();
	//outConne.sourceBlock_.dispose();

	Blockly.Tooltip.lastSelectedBlockID = null;
	Blockly.Tooltip.lastSelectedBlockType = null;
    }
}

Blockly.Tooltip.autoInsertBlock = function(element){
    if(!element.workspace.isFlyout){
	return;
    }
    if(!(element.inputList.length == 1)){
	return;
    }
    if(Blockly.Tooltip.lastSelectedBlockType == element.type){
	return;
    }
    if (element.inputsInline){
	return;
    }
    if (element.type == "comment" || element.type == "variables_get"){
	return;
    }
    try{
	Blockly.Tooltip.deleteAutoInsertedBlock();
    }finally{
	Blockly.Tooltip.lastSelectedBlockID = null;
	Blockly.Tooltip.lastSelectedBlockType = null;
    }
    Blockly.Tooltip.lastSelectedBlockType = element.type;

    var workspace = Blockly.getMainWorkspace();
    var newBlock = Blockly.Block.obtain(workspace,element.type);
    newBlock.initSvg();
    newBlock.render();

    var newBlockConnection = newBlock.getConnections_(false)[0];
    var oppositeType = Blockly.OPPOSITE_TYPE[newBlockConnection.type];
    var selectedBlock = Blockly.selected;
    if(selectedBlock == null || selectedBlock.outputConnection == null){
	// search the Output Block
	for(var i = 0; i < newBlockConnection.dbList_[oppositeType].length;++i){
	    var temp_Block = newBlockConnection.dbList_[oppositeType][i];
	    if(temp_Block.sourceBlock_.type == "output"){
		var outputBlockConnection = newBlockConnection.dbList_[oppositeType][i]; //outputBlockConnection
		break;
	    }
	}

	var inputedConnection = outputBlockConnection.targetConnection; // Connected with the output block
	if(inputedConnection == null){
	    newBlock.dispose();
	    return;
	}
	inputedConnection.sourceBlock_.setParent(null);
	// Try Connect
	var connection = Blockly.Connection.singleConnection_(
	    newBlockConnection.sourceBlock_,
	    inputedConnection.sourceBlock_);
	try{
	    connection.connect(inputedConnection);
	    outputBlockConnection.connect(newBlockConnection);
	    Blockly.Tooltip.lastSelectedBlockID = newBlock.id;
	}catch (e){
	    outputBlockConnection.connect(inputedConnection);
	    newBlockConnection.sourceBlock_.dispose();
	    Blockly.Tooltip.lastSelectedBlockID = null;
	}
	return;
    }else{
	if(selectedBlock.parentBlock_  != null){
	    if(selectedBlock.parentBlock_.inputList.length == 1){

		var outConne = null;
		for(var i = 0; i < newBlockConnection.dbList_[oppositeType].length;++i){
		    var temp_Block = newBlockConnection.dbList_[oppositeType][i];
		    if(selectedBlock.parentBlock_.id == temp_Block.sourceBlock_.id){
			outConne = newBlockConnection.dbList_[oppositeType][i]; // OutputBlock
			break;
		    }
		}
	    }else{
		// for multiple input able Block
		console.log(selectedBlock.parentBlock_);

		var outConne = null;
		for(var i = 0; i < selectedBlock.parentBlock_.inputList.length;++i){
		    var temp_connection = selectedBlock.parentBlock_.inputList[i];
		    for(var j = 0; j<temp_connection.sourceBlock_.childBlocks_.length;++j){
			if(temp_connection.sourceBlock_.childBlocks_[j].id == selectedBlock.id){
			    outConne = temp_connection.connection;
			    break;
			}
		    }
		    if(!(outConne == null)){
			break;
		    }
		}
		if(outConne == null){
		    return;
		}
		var inputedConnection = selectedBlock.getConnections_(false)[0];
		var connectionList = outConne.sourceBlock_.getConnections_(false);

		var connectionList = outConne.sourceBlock_.getConnections_(false);
		for(var i = 0; i < connectionList.length; ++i){
		    if(connectionList[i].targetConnection!=null &&
		       connectionList[i].targetConnection.sourceBlock_.id == selectedBlock.id){
			var parentConnection = connectionList[i];
			break;
		    }
		}
		console.log(inputedConnection);
		inputedConnection.sourceBlock_.setParent(null);
		var connection = Blockly.Connection.singleConnection_(
		    newBlockConnection.sourceBlock_,
		    inputedConnection.sourceBlock_);
		connection.connect(inputedConnection);
		newBlockConnection.connect(parentConnection);
		Blockly.Tooltip.lastSelectedBlockID = newBlock.id;
		return;
	    }

	    if(newBlockConnection.checkType_(outConne)){
		newBlockConnection.connect(outConne);
		Blockly.Tooltip.lastSelectedBlockID = newBlock.id;
	    }else{
		newBlock.dispose();
	    }
	}else{
	    var selectedBlockConnection = selectedBlock.getConnections_(false)[0]
	    var connection = Blockly.Connection.singleConnection_(
		newBlockConnection.sourceBlock_,
		selectedBlockConnection.sourceBlock_);
	    var x = selectedBlockConnection.x_;
	    var y = selectedBlockConnection.y_;
	    if(connection == false){
		newBlock.dispose();
		return;
	    }
	    connection.connect(selectedBlockConnection);
	    var newX = x-newBlock.width;
	    if(newX < 0 ){
		newX = 0
	    }
	    newBlock.moveBy(newX,y);
	    Blockly.Tooltip.lastSelectedBlockID = newBlock.id;
	}
    }
    return;
}

/**
 * Hide the tooltip if the mouse is over a different object.
 * Initialize the tooltip to potentially appear for this object.
 * @param {!Event} e Mouse event.
 * @private
 */
Blockly.Tooltip.onMouseOver_ = function(e) {
  // If the tooltip is an object, treat it as a pointer to the next object in
  // the chain to look at.  Terminate when a string or function is found.
  var element = e.target;

  while (!goog.isString(element.tooltip) && !goog.isFunction(element.tooltip)) {
    element = element.tooltip;
  }
  Blockly.Tooltip.autoInsertBlock(element);

  if (Blockly.Tooltip.element_ != element) {
    Blockly.Tooltip.hide();
    Blockly.Tooltip.poisonedElement_ = null;
    Blockly.Tooltip.element_ = element;
  }
  // Forget about any immediately preceeding mouseOut event.
  clearTimeout(Blockly.Tooltip.mouseOutPid_);
};

/**
 * Hide the tooltip if the mouse leaves the object and enters the workspace.
 * @param {!Event} e Mouse event.
 * @private
 */
Blockly.Tooltip.onMouseOut_ = function(e) {
  // Moving from one element to another (overlapping or with no gap) generates
  // a mouseOut followed instantly by a mouseOver.  Fork off the mouseOut
  // event and kill it if a mouseOver is received immediately.
  // This way the task only fully executes if mousing into the void.
  Blockly.Tooltip.mouseOutPid_ = setTimeout(function() {
      var element = e.target;
	
      while (!goog.isString(element.tooltip) && !goog.isFunction(element.tooltip)) {

        element = element.tooltip;
      }
      Blockly.Tooltip.deleteAutoInsertedBlock();
      Blockly.Tooltip.element_ = null;
      Blockly.Tooltip.poisonedElement_ = null;
      Blockly.Tooltip.hide();
  }, 1);
  clearTimeout(Blockly.Tooltip.showPid_);
};

/**
 * When hovering over an element, schedule a tooltip to be shown.  If a tooltip
 * is already visible, hide it if the mouse strays out of a certain radius.
 * @param {!Event} e Mouse event.
 * @private
 */
Blockly.Tooltip.onMouseMove_ = function(e) {
  if (!Blockly.Tooltip.element_ || !Blockly.Tooltip.element_.tooltip) {
    // No tooltip here to show.
    return;
  } else if (Blockly.dragMode_ != 0) {
    // Don't display a tooltip during a drag.
    return;
  } else if (Blockly.WidgetDiv.isVisible()) {
    // Don't display a tooltip if a widget is open (tooltip would be under it).
    return;
  }
  if (Blockly.Tooltip.visible) {
    // Compute the distance between the mouse position when the tooltip was
    // shown and the current mouse position.  Pythagorean theorem.
    var dx = Blockly.Tooltip.lastX_ - e.clientX;
    var dy = Blockly.Tooltip.lastY_ - e.clientY;
    var dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (dr > Blockly.Tooltip.RADIUS_OK) {
      Blockly.Tooltip.hide();
    }
  } else if (Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_) {
    // The mouse moved, clear any previously scheduled tooltip.
    clearTimeout(Blockly.Tooltip.showPid_);
    // Maybe this time the mouse will stay put.  Schedule showing of tooltip.
    Blockly.Tooltip.lastX_ = e.clientX;
    Blockly.Tooltip.lastY_ = e.clientY;
    Blockly.Tooltip.showPid_ =
        setTimeout(Blockly.Tooltip.show_, Blockly.Tooltip.HOVER_MS);
  }
};

/**
 * Hide the tooltip.
 */
Blockly.Tooltip.hide = function() {
  if (Blockly.Tooltip.visible) {
    Blockly.Tooltip.visible = false;
    if (Blockly.Tooltip.DIV) {
      Blockly.Tooltip.DIV.style.display = 'none';
    }
  }
  clearTimeout(Blockly.Tooltip.showPid_);
};

/**
 * Create the tooltip and show it.
 * @private
 */
Blockly.Tooltip.show_ = function() {
  Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
  if (!Blockly.Tooltip.DIV) {
    return;
  }
  // Erase all existing text.
  goog.dom.removeChildren(/** @type {!Element} */ (Blockly.Tooltip.DIV));
  // Get the new text.
  var tip = Blockly.Tooltip.element_.tooltip;
  if (goog.isFunction(tip)) {
    tip = tip();
  }
  tip = Blockly.Tooltip.wrap_(tip, Blockly.Tooltip.LIMIT);
  // Create new text, line by line.
  var lines = tip.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(lines[i]));
    Blockly.Tooltip.DIV.appendChild(div);
  }
  var rtl = Blockly.Tooltip.element_.RTL;
  var windowSize = goog.dom.getViewportSize();
  // Display the tooltip.
  Blockly.Tooltip.DIV.style.direction = rtl ? 'rtl' : 'ltr';
  Blockly.Tooltip.DIV.style.display = 'block';
  Blockly.Tooltip.visible = true;
  // Move the tooltip to just below the cursor.
  var anchorX = Blockly.Tooltip.lastX_;
  if (rtl) {
    anchorX -= Blockly.Tooltip.OFFSET_X + Blockly.Tooltip.DIV.offsetWidth;
  } else {
    anchorX += Blockly.Tooltip.OFFSET_X;
  }
  var anchorY = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;

  if (anchorY + Blockly.Tooltip.DIV.offsetHeight > windowSize.height) {
    // Falling off the bottom of the screen; shift the tooltip up.
    anchorY -= Blockly.Tooltip.DIV.offsetHeight + 2 * Blockly.Tooltip.OFFSET_Y;
  }
  if (rtl) {
    // Prevent falling off left edge in RTL mode.
    anchorX = Math.max(Blockly.Tooltip.MARGINS, anchorX);
  } else {
    if (anchorX + Blockly.Tooltip.DIV.offsetWidth >
        windowSize.width - 2 * Blockly.Tooltip.MARGINS) {
      // Falling off the right edge of the screen;
      // clamp the tooltip on the edge.
      anchorX = windowSize.width - Blockly.Tooltip.DIV.offsetWidth -
          2 * Blockly.Tooltip.MARGINS;
    }
  }
  Blockly.Tooltip.DIV.style.top = anchorY + 'px';
  Blockly.Tooltip.DIV.style.left = anchorX + 'px';
};

/**
 * Wrap text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 * @private
 */
Blockly.Tooltip.wrap_ = function(text, limit) {
  if (text.length <= limit) {
    // Short text, no need to wrap.
    return text;
  }
  // Split the text into words.
  var words = text.trim().split(/\s+/);
  // Set limit to be the length of the largest word.
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > limit) {
      limit = words[i].length;
    }
  }

  var lastScore;
  var score = -Infinity;
  var lastText;
  var lineCount = 1;
  do {
    lastScore = score;
    lastText = text;
    // Create a list of booleans representing if a space (false) or
    // a break (true) appears after each word.
    var wordBreaks = [];
    // Seed the list with evenly spaced linebreaks.
    var steps = words.length / lineCount;
    var insertedBreaks = 1;
    for (var i = 0; i < words.length - 1; i++) {
      if (insertedBreaks < (i + 1.5) / steps) {
        insertedBreaks++;
        wordBreaks[i] = true;
      } else {
        wordBreaks[i] = false;
      }
    }
    wordBreaks = Blockly.Tooltip.wrapMutate_(words, wordBreaks, limit);
    score = Blockly.Tooltip.wrapScore_(words, wordBreaks, limit);
    text = Blockly.Tooltip.wrapToText_(words, wordBreaks);
    lineCount++;
  } while (score > lastScore);
  return lastText;
};

/**
 * Compute a score for how good the wrapping is.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {number} Larger the better.
 * @private
 */
Blockly.Tooltip.wrapScore_ = function(words, wordBreaks, limit) {
  // If this function becomes a performance liability, add caching.
  // Compute the length of each line.
  var lineLengths = [0];
  var linePunctuation = [];
  for (var i = 0; i < words.length; i++) {
    lineLengths[lineLengths.length - 1] += words[i].length;
    if (wordBreaks[i] === true) {
      lineLengths.push(0);
      linePunctuation.push(words[i].charAt(words[i].length - 1));
    } else if (wordBreaks[i] === false) {
      lineLengths[lineLengths.length - 1]++;
    }
  }
  var maxLength = Math.max.apply(Math, lineLengths);

  var score = 0;
  for (var i = 0; i < lineLengths.length; i++) {
    // Optimize for width.
    // -2 points per char over limit (scaled to the power of 1.5).
    score -= Math.pow(Math.abs(limit - lineLengths[i]), 1.5) * 2;
    // Optimize for even lines.
    // -1 point per char smaller than max (scaled to the power of 1.5).
    score -= Math.pow(maxLength - lineLengths[i], 1.5);
    // Optimize for structure.
    // Add score to line endings after punctuation.
    if ('.?!'.indexOf(linePunctuation[i]) != -1) {
      score += limit / 3;
    } else if (',;)]}'.indexOf(linePunctuation[i]) != -1) {
      score += limit / 4;
    }
  }
  // All else being equal, the last line should not be longer than the
  // previous line.  For example, this looks wrong:
  // aaa bbb
  // ccc ddd eee
  if (lineLengths.length > 1 && lineLengths[lineLengths.length - 1] <=
      lineLengths[lineLengths.length - 2]) {
    score += 0.5;
  }
  return score;
};

/**
 * Mutate the array of line break locations until an optimal solution is found.
 * No line breaks are added or deleted, they are simply moved around.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {!Array.<boolean>} New array of optimal line breaks.
 * @private
 */
Blockly.Tooltip.wrapMutate_ = function(words, wordBreaks, limit) {
  var bestScore = Blockly.Tooltip.wrapScore_(words, wordBreaks, limit);
  var bestBreaks;
  // Try shifting every line break forward or backward.
  for (var i = 0; i < wordBreaks.length - 1; i++) {
    if (wordBreaks[i] == wordBreaks[i + 1]) {
      continue;
    }
    var mutatedWordBreaks = [].concat(wordBreaks);
    mutatedWordBreaks[i] = !mutatedWordBreaks[i];
    mutatedWordBreaks[i + 1] = !mutatedWordBreaks[i + 1];
    var mutatedScore =
        Blockly.Tooltip.wrapScore_(words, mutatedWordBreaks, limit);
    if (mutatedScore > bestScore) {
      bestScore = mutatedScore;
      bestBreaks = mutatedWordBreaks;
    }
  }
  if (bestBreaks) {
    // Found an improvement.  See if it may be improved further.
    return Blockly.Tooltip.wrapMutate_(words, bestBreaks, limit);
  }
  // No improvements found.  Done.
  return wordBreaks;
};

/**
 * Reassemble the array of words into text, with the specified line breaks.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @return {string} Plain text.
 * @private
 */
Blockly.Tooltip.wrapToText_ = function(words, wordBreaks) {
  var text = [];
  for (var i = 0; i < words.length; i++) {
    text.push(words[i]);
    if (wordBreaks[i] !== undefined) {
      text.push(wordBreaks[i] ? '\n' : ' ');
    }
  }
  return text.join('');
};
