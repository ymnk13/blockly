// Do not edit this file; automatically generated by build.py.
"use strict";


// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python=new Blockly.Generator("Python");Blockly.Python.addReservedWords("and,as,assert,break,class,continue,def,del,elif,else,except,exec,finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,return,try,while,with,yield,True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern");
Blockly.Python.ORDER_ATOMIC=0;Blockly.Python.ORDER_COLLECTION=1;Blockly.Python.ORDER_STRING_CONVERSION=1;Blockly.Python.ORDER_MEMBER=2;Blockly.Python.ORDER_FUNCTION_CALL=2;Blockly.Python.ORDER_EXPONENTIATION=3;Blockly.Python.ORDER_UNARY_SIGN=4;Blockly.Python.ORDER_BITWISE_NOT=4;Blockly.Python.ORDER_MULTIPLICATIVE=5;Blockly.Python.ORDER_ADDITIVE=6;Blockly.Python.ORDER_BITWISE_SHIFT=7;Blockly.Python.ORDER_BITWISE_AND=8;Blockly.Python.ORDER_BITWISE_XOR=9;Blockly.Python.ORDER_BITWISE_OR=10;
Blockly.Python.ORDER_RELATIONAL=11;Blockly.Python.ORDER_LOGICAL_NOT=12;Blockly.Python.ORDER_LOGICAL_AND=13;Blockly.Python.ORDER_LOGICAL_OR=14;Blockly.Python.ORDER_CONDITIONAL=15;Blockly.Python.ORDER_LAMBDA=16;Blockly.Python.ORDER_NONE=99;Blockly.Python.PASS="  pass\n";
Blockly.Python.init=function(a){Blockly.Python.definitions_=Object.create(null);Blockly.Python.functionNames_=Object.create(null);Blockly.Python.variableDB_?Blockly.Python.variableDB_.reset():Blockly.Python.variableDB_=new Blockly.Names(Blockly.Python.RESERVED_WORDS_);var b=[];a=Blockly.Variables.allVariables(a);for(var c=0;c<a.length;c++)b[c]=Blockly.Python.variableDB_.getName(a[c],Blockly.Variables.NAME_TYPE)+" = None";Blockly.Python.definitions_.variables=b.join("\n")};
Blockly.Python.finish=function(a){var b=[],c=[],d;for(d in Blockly.Python.definitions_){var e=Blockly.Python.definitions_[d];e.match(/^(from\s+\S+\s+)?import\s+\S+/)?b.push(e):c.push(e)}return(b.join("\n")+"\n\n"+c.join("\n\n")).replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+a};Blockly.Python.scrubNakedValue=function(a){return a+"\n"};Blockly.Python.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/\%/g,"\\%").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.Python.scrub_=function(a,b){var c="";if(!a.outputConnection||!a.outputConnection.targetConnection){var d=a.getCommentText();d&&(c+=Blockly.Python.prefixLines(d,"# ")+"\n");for(var e=0;e<a.inputList.length;e++)a.inputList[e].type==Blockly.INPUT_VALUE&&(d=a.inputList[e].connection.targetBlock())&&(d=Blockly.Python.allNestedComments(d))&&(c+=Blockly.Python.prefixLines(d,"# "))}e=a.nextConnection&&a.nextConnection.targetBlock();e=Blockly.Python.blockToCode(e);return c+b+e};
Blockly.Python.multipleCodeToOutput=function(a,b){var c=a.split("\n"),c=c.filter(function(a,b,c){return""!=a});if(2>c.length){var d;return b+" = "+a}d=Blockly.Python.multipleCodeSplit(a);c=d[0];d=b+" = "+d[1];return c+"\n"+d};
Blockly.Python.multipleCodeSplit=function(a){var b=a.split("\n"),b=b.filter(function(a,b,c){return""!=a});if(2>b.length)return["",a];var c;for(c=b.length-2;0<=c&&","==b[c+1].charAt(0);c--);var d=[];a=[];for(var e=c+1;e<b.length;e++)a.push(b[e]);for(e=c;0<=e;e--)d.push(b[e]);d.reverse();b=d.join("\n");a=1<a.length?a.join(""):a[0]+"\n";return[b,a]};
Blockly.Python.joinCodesToOperator=function(a,b,c){a=Blockly.Python.multipleCodeSplit(a);b=Blockly.Python.multipleCodeSplit(b);var d=[],e=a[1].replace(/[\n\r]/g,"");""!=a[0]&&d.push(a[0]);a=b[1].replace(/[\n\r]/g,"");""!=b[0]&&d.push(b[0]);d.push((new String(c)).format(e,a));return d.join("\n")};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.colour={};Blockly.Python.colour_picker=function(a){return["'"+a.getFieldValue("COLOUR")+"'",Blockly.Python.ORDER_ATOMIC]};Blockly.Python.colour_random=function(a){Blockly.Python.definitions_.import_random="import random";return["'#%06x' % random.randint(0, 2**24 - 1)",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.colour_rgb=function(a){var b=Blockly.Python.provideFunction_("colour_rgb",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(r, g, b):","  r = round(min(100, max(0, r)) * 2.55)","  g = round(min(100, max(0, g)) * 2.55)","  b = round(min(100, max(0, b)) * 2.55)","  return '#%02x%02x%02x' % (r, g, b)"]),c=Blockly.Python.valueToCode(a,"RED",Blockly.Python.ORDER_NONE)||0,d=Blockly.Python.valueToCode(a,"GREEN",Blockly.Python.ORDER_NONE)||0;a=Blockly.Python.valueToCode(a,"BLUE",Blockly.Python.ORDER_NONE)||
0;return[b+"("+c+", "+d+", "+a+")",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.colour_blend=function(a){var b=Blockly.Python.provideFunction_("colour_blend",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(colour1, colour2, ratio):","  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)","  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)","  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)","  ratio = min(1, max(0, ratio))","  r = round(r1 * (1 - ratio) + r2 * ratio)","  g = round(g1 * (1 - ratio) + g2 * ratio)","  b = round(b1 * (1 - ratio) + b2 * ratio)",
"  return '#%02x%02x%02x' % (r, g, b)"]),c=Blockly.Python.valueToCode(a,"COLOUR1",Blockly.Python.ORDER_NONE)||"'#000000'",d=Blockly.Python.valueToCode(a,"COLOUR2",Blockly.Python.ORDER_NONE)||"'#000000'";a=Blockly.Python.valueToCode(a,"RATIO",Blockly.Python.ORDER_NONE)||0;return[b+"("+c+", "+d+", "+a+")",Blockly.Python.ORDER_FUNCTION_CALL]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.lists={};Blockly.Python.lists_create_empty=function(a){return["[]",Blockly.Python.ORDER_ATOMIC]};Blockly.Python.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Python.valueToCode(a,"ADD"+c,Blockly.Python.ORDER_NONE)||"None";b="["+b.join(", ")+"]";return[b,Blockly.Python.ORDER_ATOMIC]};
Blockly.Python.lists_repeat=function(a){var b=Blockly.Python.valueToCode(a,"ITEM",Blockly.Python.ORDER_NONE)||"None";a=Blockly.Python.valueToCode(a,"NUM",Blockly.Python.ORDER_MULTIPLICATIVE)||"0";return["["+b+"] * "+a,Blockly.Python.ORDER_MULTIPLICATIVE]};Blockly.Python.lists_length=function(a){return["len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"[]")+")",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.lists_isEmpty=function(a){return["not len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"[]")+")",Blockly.Python.ORDER_LOGICAL_NOT]};
Blockly.Python.lists_indexOf=function(a){var b=Blockly.Python.valueToCode(a,"FIND",Blockly.Python.ORDER_NONE)||"[]",c=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"''";return[("FIRST"==a.getFieldValue("END")?Blockly.Python.provideFunction_("first_index",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(myList, elem):","  try: theIndex = myList.index(elem) + 1","  except: theIndex = 0","  return theIndex"]):Blockly.Python.provideFunction_("last_index",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+
"(myList, elem):","  try: theIndex = len(myList) - myList[::-1].index(elem)","  except: theIndex = 0","  return theIndex"]))+"("+c+", "+b+")",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.lists_getIndex=function(a){var b=a.getFieldValue("MODE")||"GET",c=a.getFieldValue("WHERE")||"FROM_START",d=Blockly.Python.valueToCode(a,"AT",Blockly.Python.ORDER_UNARY_SIGN)||"1";a=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"[]";if("FIRST"==c){if("GET"==b)return[a+"[0]",Blockly.Python.ORDER_MEMBER];c=a+".pop(0)";if("GET_REMOVE"==b)return[c,Blockly.Python.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c+"\n"}else if("LAST"==c){if("GET"==b)return[a+"[-1]",Blockly.Python.ORDER_MEMBER];
c=a+".pop()";if("GET_REMOVE"==b)return[c,Blockly.Python.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c+"\n"}else if("FROM_START"==c){d=Blockly.isNumber(d)?parseInt(d,10)-1:"int("+d+" - 1)";if("GET"==b)return[a+"["+d+"]",Blockly.Python.ORDER_MEMBER];c=a+".pop("+d+")";if("GET_REMOVE"==b)return[c,Blockly.Python.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c+"\n"}else if("FROM_END"==c){if("GET"==b)return[a+"[-"+d+"]",Blockly.Python.ORDER_MEMBER];c=a+".pop(-"+d+")";if("GET_REMOVE"==b)return[c,Blockly.Python.ORDER_FUNCTION_CALL];
if("REMOVE"==b)return c+"\n"}else if("RANDOM"==c){Blockly.Python.definitions_.import_random="import random";if("GET"==b)return["random.choice("+a+")",Blockly.Python.ORDER_FUNCTION_CALL];c=Blockly.Python.provideFunction_("lists_remove_random_item",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  x = int(random.random() * len(myList))","  return myList.pop(x)"])+"("+a+")";if("GET_REMOVE"==b)return[c,Blockly.Python.ORDER_FUNCTION_CALL];if("REMOVE"==b)return c+"\n"}throw"Unhandled combination (lists_getIndex).";
};
Blockly.Python.lists_setIndex=function(a){var b=Blockly.Python.valueToCode(a,"LIST",Blockly.Python.ORDER_MEMBER)||"[]",c=a.getFieldValue("MODE")||"GET",d=a.getFieldValue("WHERE")||"FROM_START",e=Blockly.Python.valueToCode(a,"AT",Blockly.Python.ORDER_NONE)||"1";a=Blockly.Python.valueToCode(a,"TO",Blockly.Python.ORDER_NONE)||"None";if("FIRST"==d){if("SET"==c)return b+"[0] = "+a+"\n";if("INSERT"==c)return b+".insert(0, "+a+")\n"}else if("LAST"==d){if("SET"==c)return b+"[-1] = "+a+"\n";if("INSERT"==c)return b+
".append("+a+")\n"}else if("FROM_START"==d){e=Blockly.isNumber(e)?parseInt(e,10)-1:"int("+e+" - 1)";if("SET"==c)return b+"["+e+"] = "+a+"\n";if("INSERT"==c)return b+".insert("+e+", "+a+")\n"}else if("FROM_END"==d){if("SET"==c)return b+"[-"+e+"] = "+a+"\n";if("INSERT"==c)return b+".insert(-"+e+", "+a+")\n"}else if("RANDOM"==d){Blockly.Python.definitions_.import_random="import random";b.match(/^\w+$/)?d="":(d=Blockly.Python.variableDB_.getDistinctName("tmp_list",Blockly.Variables.NAME_TYPE),e=d+" = "+
b+"\n",b=d,d=e);e=Blockly.Python.variableDB_.getDistinctName("tmp_x",Blockly.Variables.NAME_TYPE);d+=e+" = int(random.random() * len("+b+"))\n";if("SET"==c)return d+(b+"["+e+"] = "+a+"\n");if("INSERT"==c)return d+=b+".insert("+e+", "+a+")\n"}throw"Unhandled combination (lists_setIndex).";};
Blockly.Python.lists_getSublist=function(a){var b=Blockly.Python.valueToCode(a,"LIST",Blockly.Python.ORDER_MEMBER)||"[]",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2"),e=Blockly.Python.valueToCode(a,"AT1",Blockly.Python.ORDER_ADDITIVE)||"1";a=Blockly.Python.valueToCode(a,"AT2",Blockly.Python.ORDER_ADDITIVE)||"1";"FIRST"==c||"FROM_START"==c&&"1"==e?e="":"FROM_START"==c?e=Blockly.isNumber(e)?parseInt(e,10)-1:"int("+e+" - 1)":"FROM_END"==c&&(e=Blockly.isNumber(e)?-parseInt(e,10):"-int("+e+")");
"LAST"==d||"FROM_END"==d&&"1"==a?a="":"FROM_START"==c?a=Blockly.isNumber(a)?parseInt(a,10):"int("+a+")":"FROM_END"==c&&(Blockly.isNumber(a)?(a=1-parseInt(a,10),0==a&&(a="")):(Blockly.Python.definitions_.import_sys="import sys",a="int(1 - "+a+") or sys.maxsize"));return[b+"["+e+" : "+a+"]",Blockly.Python.ORDER_MEMBER]};
Blockly.Python.lists_split=function(a){var b=a.getFieldValue("MODE");if("SPLIT"==b)b=Blockly.Python.valueToCode(a,"INPUT",Blockly.Python.ORDER_MEMBER)||"''",a=Blockly.Python.valueToCode(a,"DELIM",Blockly.Python.ORDER_NONE),a=b+".split("+a+")";else if("JOIN"==b)b=Blockly.Python.valueToCode(a,"INPUT",Blockly.Python.ORDER_NONE)||"[]",a=Blockly.Python.valueToCode(a,"DELIM",Blockly.Python.ORDER_MEMBER)||"''",a=a+".join("+b+")";else throw"Unknown mode: "+b;return[a,Blockly.Python.ORDER_FUNCTION_CALL]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.logic={};
Blockly.Python.controls_if=function(a){for(var b=0,c=Blockly.Python.valueToCode(a,"IF"+b,Blockly.Python.ORDER_NONE)||"False",d=Blockly.Python.statementToCode(a,"DO"+b)||Blockly.Python.PASS,e="if "+c+":\n"+d,b=1;b<=a.elseifCount_;b++)c=Blockly.Python.valueToCode(a,"IF"+b,Blockly.Python.ORDER_NONE)||"False",d=Blockly.Python.statementToCode(a,"DO"+b)||Blockly.Python.PASS,e+="elif "+c+":\n"+d;a.elseCount_&&(d=Blockly.Python.statementToCode(a,"ELSE")||Blockly.Python.PASS,e+="else:\n"+d);return e};
Blockly.Python.logic_compare=function(a){var b={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],c=Blockly.Python.ORDER_RELATIONAL,d=Blockly.Python.valueToCode(a,"A",c)||"0";a=Blockly.Python.valueToCode(a,"B",c)||"0";return[d+" "+b+" "+a,c]};
Blockly.Python.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"and":"or",c="and"==b?Blockly.Python.ORDER_LOGICAL_AND:Blockly.Python.ORDER_LOGICAL_OR,d=Blockly.Python.valueToCode(a,"A",c);a=Blockly.Python.valueToCode(a,"B",c);if(d||a){var e="and"==b?"True":"False";d||(d=e);a||(a=e)}else a=d="False";return[d+" "+b+" "+a,c]};Blockly.Python.logic_negate=function(a){return["not "+(Blockly.Python.valueToCode(a,"BOOL",Blockly.Python.ORDER_LOGICAL_NOT)||"True"),Blockly.Python.ORDER_LOGICAL_NOT]};
Blockly.Python.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"True":"False",Blockly.Python.ORDER_ATOMIC]};Blockly.Python.logic_null=function(a){return["None",Blockly.Python.ORDER_ATOMIC]};
Blockly.Python.logic_ternary=function(a){var b=Blockly.Python.valueToCode(a,"IF",Blockly.Python.ORDER_CONDITIONAL)||"False",c=Blockly.Python.valueToCode(a,"THEN",Blockly.Python.ORDER_CONDITIONAL)||"None";a=Blockly.Python.valueToCode(a,"ELSE",Blockly.Python.ORDER_CONDITIONAL)||"None";return[c+" if "+b+" else "+a,Blockly.Python.ORDER_CONDITIONAL]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.loops={};Blockly.Python.controls_repeat=function(a){var b=parseInt(a.getFieldValue("TIMES"),10),c=Blockly.Python.statementToCode(a,"DO"),c=Blockly.Python.addLoopTrap(c,a.id)||Blockly.Python.PASS;return"for "+Blockly.Python.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE)+" in range("+b+"):\n"+c};
Blockly.Python.controls_repeat_ext=function(a){var b=Blockly.Python.valueToCode(a,"TIMES",Blockly.Python.ORDER_NONE)||"0",b=Blockly.isNumber(b)?parseInt(b,10):"int("+b+")",c=Blockly.Python.statementToCode(a,"DO"),c=Blockly.Python.addLoopTrap(c,a.id)||Blockly.Python.PASS;return"for "+Blockly.Python.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE)+" in range("+b+"):\n"+c};
Blockly.Python.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.Python.valueToCode(a,"BOOL",b?Blockly.Python.ORDER_LOGICAL_NOT:Blockly.Python.ORDER_NONE)||"False",d=Blockly.Python.statementToCode(a,"DO"),d=Blockly.Python.addLoopTrap(d,a.id)||Blockly.Python.PASS;b&&(c="not "+c);return"while "+c+":\n"+d};
Blockly.Python.controls_for=function(a){var b=Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Python.valueToCode(a,"FROM",Blockly.Python.ORDER_NONE)||"0",d=Blockly.Python.valueToCode(a,"TO",Blockly.Python.ORDER_NONE)||"0",e=Blockly.Python.valueToCode(a,"BY",Blockly.Python.ORDER_NONE)||"1",g=Blockly.Python.statementToCode(a,"DO"),g=Blockly.Python.addLoopTrap(g,a.id)||Blockly.Python.PASS,f="",h=function(){return Blockly.Python.provideFunction_("upRange",
["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(start, stop, step):","  while start <= stop:","    yield start","    start += abs(step)"])},k=function(){return Blockly.Python.provideFunction_("downRange",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(start, stop, step):","  while start >= stop:","    yield start","    start -= abs(step)"])};a=function(a,b,c){return"("+a+" <= "+b+") and "+h()+"("+a+", "+b+", "+c+") or "+k()+"("+a+", "+b+", "+c+")"};if(Blockly.isNumber(c)&&Blockly.isNumber(d)&&
Blockly.isNumber(e))c=parseFloat(c),d=parseFloat(d),e=Math.abs(parseFloat(e)),0===c%1&&0===d%1&&0===e%1?(c<=d?(d++,a=0==c&&1==e?d:c+", "+d,1!=e&&(a+=", "+e)):(d--,a=c+", "+d+", -"+e),a="range("+a+")"):(a=c<d?h():k(),a+="("+c+", "+d+", "+e+")");else{var l=function(a,c){if(Blockly.isNumber(a))a=parseFloat(a);else if(a.match(/^\w+$/))a="float("+a+")";else{var d=Blockly.Python.variableDB_.getDistinctName(b+c,Blockly.Variables.NAME_TYPE);f+=d+" = float("+a+")\n";a=d}return a},c=l(c,"_start"),d=l(d,"_end");
l(e,"_inc");a="number"==typeof c&&"number"==typeof d?c<d?h(c,d,e):k(c,d,e):a(c,d,e)}return f+="for "+b+" in "+a+":\n"+g};Blockly.Python.controls_forEach=function(a){var b=Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Python.valueToCode(a,"LIST",Blockly.Python.ORDER_RELATIONAL)||"[]",d=Blockly.Python.statementToCode(a,"DO"),d=Blockly.Python.addLoopTrap(d,a.id)||Blockly.Python.PASS;return"for "+b+" in "+c+":\n"+d};
Blockly.Python.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return"break\n";case "CONTINUE":return"continue\n"}throw"Unknown flow statement.";};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.math={};Blockly.Python.addReservedWords("math,random");Blockly.Python.math_number=function(a){a=parseFloat(a.getFieldValue("NUM"));return[a,0>a?Blockly.Python.ORDER_UNARY_SIGN:Blockly.Python.ORDER_ATOMIC]};
Blockly.Python.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.Python.ORDER_ADDITIVE],MINUS:[" - ",Blockly.Python.ORDER_ADDITIVE],MULTIPLY:[" * ",Blockly.Python.ORDER_MULTIPLICATIVE],DIVIDE:[" / ",Blockly.Python.ORDER_MULTIPLICATIVE],POWER:[" ** ",Blockly.Python.ORDER_EXPONENTIATION]}[a.getFieldValue("OP")],c=b[0],b=b[1],d=Blockly.Python.valueToCode(a,"A",b)||"0";a=Blockly.Python.valueToCode(a,"B",b)||"0";return[d+c+a,b]};
Blockly.Python.math_single=function(a){var b=a.getFieldValue("OP"),c;if("NEG"==b)return c=Blockly.Python.valueToCode(a,"NUM",Blockly.Python.ORDER_UNARY_SIGN)||"0",["-"+c,Blockly.Python.ORDER_UNARY_SIGN];Blockly.Python.definitions_.import_math="import math";a="SIN"==b||"COS"==b||"TAN"==b?Blockly.Python.valueToCode(a,"NUM",Blockly.Python.ORDER_MULTIPLICATIVE)||"0":Blockly.Python.valueToCode(a,"NUM",Blockly.Python.ORDER_NONE)||"0";switch(b){case "ABS":c="math.fabs("+a+")";break;case "ROOT":c="math.sqrt("+
a+")";break;case "LN":c="math.log("+a+")";break;case "LOG10":c="math.log10("+a+")";break;case "EXP":c="math.exp("+a+")";break;case "POW10":c="math.pow(10,"+a+")";break;case "ROUND":c="round("+a+")";break;case "ROUNDUP":c="math.ceil("+a+")";break;case "ROUNDDOWN":c="math.floor("+a+")";break;case "SIN":c="math.sin("+a+" / 180.0 * math.pi)";break;case "COS":c="math.cos("+a+" / 180.0 * math.pi)";break;case "TAN":c="math.tan("+a+" / 180.0 * math.pi)"}if(c)return[c,Blockly.Python.ORDER_FUNCTION_CALL];switch(b){case "ASIN":c=
"math.asin("+a+") / math.pi * 180";break;case "ACOS":c="math.acos("+a+") / math.pi * 180";break;case "ATAN":c="math.atan("+a+") / math.pi * 180";break;default:throw"Unknown math operator: "+b;}return[c,Blockly.Python.ORDER_MULTIPLICATIVE]};
Blockly.Python.math_constant=function(a){var b={PI:["math.pi",Blockly.Python.ORDER_MEMBER],E:["math.e",Blockly.Python.ORDER_MEMBER],GOLDEN_RATIO:["(1 + math.sqrt(5)) / 2",Blockly.Python.ORDER_MULTIPLICATIVE],SQRT2:["math.sqrt(2)",Blockly.Python.ORDER_MEMBER],SQRT1_2:["math.sqrt(1.0 / 2)",Blockly.Python.ORDER_MEMBER],INFINITY:["float('inf')",Blockly.Python.ORDER_ATOMIC]};a=a.getFieldValue("CONSTANT");"INFINITY"!=a&&(Blockly.Python.definitions_.import_math="import math");return b[a]};
Blockly.Python.math_number_property=function(a){var b=Blockly.Python.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Python.ORDER_MULTIPLICATIVE)||"0",c=a.getFieldValue("PROPERTY"),d;if("PRIME"==c)return Blockly.Python.definitions_.import_math="import math",d=Blockly.Python.provideFunction_("math_isPrime",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(n):","  # https://en.wikipedia.org/wiki/Primality_test#Naive_methods","  # If n is not a number but a string, try parsing it.","  if type(n) not in (int, float, long):",
"    try:","      n = float(n)","    except:","      return False","  if n == 2 or n == 3:","    return True","  # False if n is negative, is 1, or not whole, or if n is divisible by 2 or 3.","  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:","    return False","  # Check all the numbers of form 6k +/- 1, up to sqrt(n).","  for x in range(6, int(math.sqrt(n)) + 2, 6):","    if n % (x - 1) == 0 or n % (x + 1) == 0:","      return False","  return True"])+"("+b+")",[d,Blockly.Python.ORDER_FUNCTION_CALL];
switch(c){case "EVEN":d=b+" % 2 == 0";break;case "ODD":d=b+" % 2 == 1";break;case "WHOLE":d=b+" % 1 == 0";break;case "POSITIVE":d=b+" > 0";break;case "NEGATIVE":d=b+" < 0";break;case "DIVISIBLE_BY":a=Blockly.Python.valueToCode(a,"DIVISOR",Blockly.Python.ORDER_MULTIPLICATIVE);if(!a||"0"==a)return["False",Blockly.Python.ORDER_ATOMIC];d=b+" % "+a+" == 0"}return[d,Blockly.Python.ORDER_RELATIONAL]};
Blockly.Python.math_change=function(a){var b=Blockly.Python.valueToCode(a,"DELTA",Blockly.Python.ORDER_ADDITIVE)||"0";a=Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);return a+" = ("+a+" if type("+a+") in (int, float, long) else 0) + "+b+"\n"};Blockly.Python.math_round=Blockly.Python.math_single;Blockly.Python.math_trig=Blockly.Python.math_single;
Blockly.Python.math_on_list=function(a){var b=a.getFieldValue("OP");a=Blockly.Python.valueToCode(a,"LIST",Blockly.Python.ORDER_NONE)||"[]";switch(b){case "SUM":b="sum("+a+")";break;case "MIN":b="min("+a+")";break;case "MAX":b="max("+a+")";break;case "AVERAGE":b=Blockly.Python.provideFunction_("math_mean",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  localList = [e for e in myList if type(e) in (int, float, long)]","  if not localList: return","  return float(sum(localList)) / len(localList)"]);
b=b+"("+a+")";break;case "MEDIAN":b=Blockly.Python.provideFunction_("math_median",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(myList):","  localList = sorted([e for e in myList if type(e) in (int, float, long)])","  if not localList: return","  if len(localList) % 2 == 0:","    return (localList[len(localList) / 2 - 1] + localList[len(localList) / 2]) / 2.0","  else:","    return localList[(len(localList) - 1) / 2]"]);b=b+"("+a+")";break;case "MODE":b=Blockly.Python.provideFunction_("math_modes",
["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(some_list):","  modes = []","  # Using a lists of [item, count] to keep count rather than dict",'  # to avoid "unhashable" errors when the counted item is itself a list or dict.',"  counts = []","  maxCount = 1","  for item in some_list:","    found = False","    for count in counts:","      if count[0] == item:","        count[1] += 1","        maxCount = max(maxCount, count[1])","        found = True","    if not found:","      counts.append([item, 1])",
"  for counted_item, item_count in counts:","    if item_count == maxCount:","      modes.append(counted_item)","  return modes"]);b=b+"("+a+")";break;case "STD_DEV":Blockly.Python.definitions_.import_math="import math";b=Blockly.Python.provideFunction_("math_standard_deviation",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(numbers):","  n = len(numbers)","  if n == 0: return","  mean = float(sum(numbers)) / n","  variance = sum((x - mean) ** 2 for x in numbers) / n","  return math.sqrt(variance)"]);
b=b+"("+a+")";break;case "RANDOM":Blockly.Python.definitions_.import_random="import random";b="random.choice("+a+")";break;default:throw"Unknown operator: "+b;}return[b,Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.math_modulo=function(a){var b=Blockly.Python.valueToCode(a,"DIVIDEND",Blockly.Python.ORDER_MULTIPLICATIVE)||"0";a=Blockly.Python.valueToCode(a,"DIVISOR",Blockly.Python.ORDER_MULTIPLICATIVE)||"0";return[b+" % "+a,Blockly.Python.ORDER_MULTIPLICATIVE]};
Blockly.Python.math_constrain=function(a){var b=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"0",c=Blockly.Python.valueToCode(a,"LOW",Blockly.Python.ORDER_NONE)||"0";a=Blockly.Python.valueToCode(a,"HIGH",Blockly.Python.ORDER_NONE)||"float('inf')";return["min(max("+b+", "+c+"), "+a+")",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.math_random_int=function(a){Blockly.Python.definitions_.import_random="import random";var b=Blockly.Python.valueToCode(a,"FROM",Blockly.Python.ORDER_NONE)||"0";a=Blockly.Python.valueToCode(a,"TO",Blockly.Python.ORDER_NONE)||"0";return["random.randint("+b+", "+a+")",Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.math_random_float=function(a){Blockly.Python.definitions_.import_random="import random";return["random.random()",Blockly.Python.ORDER_FUNCTION_CALL]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.procedures={};
Blockly.Python.procedures_defreturn=function(a){for(var b=Blockly.Variables.allVariables(a),c=b.length-1;0<=c;c--){var d=b[c];-1==a.arguments_.indexOf(d)?b[c]=Blockly.Python.variableDB_.getName(d,Blockly.Variables.NAME_TYPE):b.splice(c,1)}b=b.length?"  global "+b.join(", ")+"\n":"";c=Blockly.Python.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE);d=Blockly.Python.statementToCode(a,"STACK");Blockly.Python.STATEMENT_PREFIX&&(d=Blockly.Python.prefixLines(Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,"'"+
a.id+"'"),Blockly.Python.INDENT)+d);Blockly.Python.INFINITE_LOOP_TRAP&&(d=Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,'"'+a.id+'"')+d);var e=Blockly.Python.valueToCode(a,"RETURN",Blockly.Python.ORDER_NONE)||"";e?e="  return "+e+"\n":d||(d=Blockly.Python.PASS);for(var g=[],f=0;f<a.arguments_.length;f++)g[f]=Blockly.Python.variableDB_.getName(a.arguments_[f],Blockly.Variables.NAME_TYPE);b="def "+c+"("+g.join(", ")+"):\n"+b+d+e;b=Blockly.Python.scrub_(a,b);Blockly.Python.definitions_[c]=b;return null};
Blockly.Python.procedures_defnoreturn=Blockly.Python.procedures_defreturn;Blockly.Python.procedures_callreturn=function(a){for(var b=Blockly.Python.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Python.valueToCode(a,"ARG"+d,Blockly.Python.ORDER_NONE)||"None";return[b+"("+c.join(", ")+")",Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.procedures_callnoreturn=function(a){for(var b=Blockly.Python.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Python.valueToCode(a,"ARG"+d,Blockly.Python.ORDER_NONE)||"None";return b+"("+c.join(", ")+")\n"};
Blockly.Python.procedures_ifreturn=function(a){var b="if "+(Blockly.Python.valueToCode(a,"CONDITION",Blockly.Python.ORDER_NONE)||"False")+":\n";a.hasReturnValue_?(a=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"None",b+="  return "+a+"\n"):b+="  return\n";return b};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.texts={};Blockly.Python.text=function(a){return[Blockly.Python.quote_(a.getFieldValue("TEXT")),Blockly.Python.ORDER_ATOMIC]};
Blockly.Python.text_join=function(a){var b;if(0==a.itemCount_)return["''",Blockly.Python.ORDER_ATOMIC];if(1==a.itemCount_)return b=Blockly.Python.valueToCode(a,"ADD0",Blockly.Python.ORDER_NONE)||"''",["str("+b+")",Blockly.Python.ORDER_FUNCTION_CALL];if(2==a.itemCount_)return b=Blockly.Python.valueToCode(a,"ADD0",Blockly.Python.ORDER_NONE)||"''",a=Blockly.Python.valueToCode(a,"ADD1",Blockly.Python.ORDER_NONE)||"''",["str("+b+") + str("+a+")",Blockly.Python.ORDER_UNARY_SIGN];b=[];for(var c=0;c<a.itemCount_;c++)b[c]=
Blockly.Python.valueToCode(a,"ADD"+c,Blockly.Python.ORDER_NONE)||"''";a=Blockly.Python.variableDB_.getDistinctName("temp_value",Blockly.Variables.NAME_TYPE);b="''.join([str("+a+") for "+a+" in ["+b.join(", ")+"]])";return[b,Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.text_append=function(a){var b=Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_NONE)||"''";return b+" = str("+b+") + str("+a+")\n"};
Blockly.Python.text_length=function(a){return["len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"''")+")",Blockly.Python.ORDER_FUNCTION_CALL]};Blockly.Python.text_isEmpty=function(a){return["not len("+(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"''")+")",Blockly.Python.ORDER_LOGICAL_NOT]};
Blockly.Python.text_indexOf=function(a){var b="FIRST"==a.getFieldValue("END")?"find":"rfind",c=Blockly.Python.valueToCode(a,"FIND",Blockly.Python.ORDER_NONE)||"''";return[(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"''")+"."+b+"("+c+") + 1",Blockly.Python.ORDER_MEMBER]};
Blockly.Python.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.Python.valueToCode(a,"AT",Blockly.Python.ORDER_UNARY_SIGN)||"1";a=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_MEMBER)||"''";switch(b){case "FIRST":return[a+"[0]",Blockly.Python.ORDER_MEMBER];case "LAST":return[a+"[-1]",Blockly.Python.ORDER_MEMBER];case "FROM_START":return c=Blockly.isNumber(c)?parseInt(c,10)-1:"int("+c+" - 1)",[a+"["+c+"]",Blockly.Python.ORDER_MEMBER];case "FROM_END":return[a+
"[-"+c+"]",Blockly.Python.ORDER_MEMBER];case "RANDOM":return Blockly.Python.definitions_.import_random="import random",b=Blockly.Python.provideFunction_("text_random_letter",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(text):","  x = int(random.random() * len(text))","  return text[x];"])+"("+a+")",[b,Blockly.Python.ORDER_FUNCTION_CALL]}throw"Unhandled option (text_charAt).";};
Blockly.Python.text_getSubstring=function(a){var b=Blockly.Python.valueToCode(a,"STRING",Blockly.Python.ORDER_MEMBER)||"''",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2"),e=Blockly.Python.valueToCode(a,"AT1",Blockly.Python.ORDER_ADDITIVE)||"1";a=Blockly.Python.valueToCode(a,"AT2",Blockly.Python.ORDER_ADDITIVE)||"1";"FIRST"==c||"FROM_START"==c&&"1"==e?e="":"FROM_START"==c?e=Blockly.isNumber(e)?parseInt(e,10)-1:"int("+e+" - 1)":"FROM_END"==c&&(e=Blockly.isNumber(e)?-parseInt(e,10):"-int("+
e+")");"LAST"==d||"FROM_END"==d&&"1"==a?a="":"FROM_START"==c?a=Blockly.isNumber(a)?parseInt(a,10):"int("+a+")":"FROM_END"==c&&(Blockly.isNumber(a)?(a=1-parseInt(a,10),0==a&&(a="")):(Blockly.Python.definitions_.import_sys="import sys",a="int(1 - "+a+") or sys.maxsize"));return[b+"["+e+" : "+a+"]",Blockly.Python.ORDER_MEMBER]};
Blockly.Python.text_changeCase=function(a){var b={UPPERCASE:".upper()",LOWERCASE:".lower()",TITLECASE:".title()"}[a.getFieldValue("CASE")];return[(Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_MEMBER)||"''")+b,Blockly.Python.ORDER_MEMBER]};Blockly.Python.text_trim=function(a){var b={LEFT:".lstrip()",RIGHT:".rstrip()",BOTH:".strip()"}[a.getFieldValue("MODE")];return[(Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_MEMBER)||"''")+b,Blockly.Python.ORDER_MEMBER]};
Blockly.Python.text_print=function(a){return"print("+(Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_NONE)||"''")+")\n"};Blockly.Python.text_prompt=function(a){var b=Blockly.Python.provideFunction_("text_prompt",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(msg):","  try:","    return raw_input(msg)","  except NameError:","    return input(msg)"]),c=Blockly.Python.quote_(a.getFieldValue("TEXT")),b=b+"("+c+")";"NUMBER"==a.getFieldValue("TYPE")&&(b="float("+b+")");return[b,Blockly.Python.ORDER_FUNCTION_CALL]};
Blockly.Python.text_prompt_ext=function(a){var b=Blockly.Python.provideFunction_("text_prompt",["def "+Blockly.Python.FUNCTION_NAME_PLACEHOLDER_+"(msg):","  try:","    return raw_input(msg)","  except NameError:","    return input(msg)"]),c=Blockly.Python.valueToCode(a,"TEXT",Blockly.Python.ORDER_NONE)||"''",b=b+"("+c+")";"NUMBER"==a.getFieldValue("TYPE")&&(b="float("+b+")");return[b,Blockly.Python.ORDER_FUNCTION_CALL]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Python.variables={};Blockly.Python.variables_get=function(a){return[Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),Blockly.Python.ORDER_ATOMIC]};Blockly.Python.variables_set=function(a){var b=Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_NONE)||"0";return Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" = "+b+"\n"};