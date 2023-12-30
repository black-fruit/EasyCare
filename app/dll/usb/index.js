var ffi = require('ffi');
var ref = require('ref');
var refArray = require('ref-array');
var path = require('path');

var intPointer 		= ref.refType('int');
var doublePointer 	= ref.refType('double');
var charPointer  	= ref.refType('char');
var stringPointer   = ref.refType(ref.types.CString);
var boolPointer		= ref.refType('bool');

var stringArray 	= refArray(ref.types.CString);

function usbEntry() {
	this.name = 'usb controller';
	this.driveChangedCB = undefined;
}

function wideCharBufferToString(buffer, size){
	if(buffer === undefined){
		return '';
	}

	if(size === undefined){
		size = 1000;
	}

	var tmpStr = buffer.toString('ucs2', 0, size);	

	var charArray = [];
	for(var index = 0; index < tmpStr.length; ++index){
		if(tmpStr[index] !== '\u0000'){
			charArray.push(tmpStr[index]);
		}
	}

	return charArray.join('');
}

if(global.isDev){
	var libpath = path.join(APP_PATH, '/dll/usb/USBKeySDK.dll');
}else{
  var libpath = path.join(APP_PATH, '..', '..', '/USBKeySDK.dll');
}

var usbLib = ffi.Library(libpath, {
	'InitSDK': ['int', ['pointer']],
	'GetData': ['int', ['char', stringPointer]],
	'ClearData': ['int', [charPointer, charPointer]],
	'GetRemovableDrives': ['int', [stringPointer]]
});

var callback = ffi.Callback('int', [stringPointer, 'bool'], function(drive, isConnected){
	
	var driveName = wideCharBufferToString(drive);	

	if(isConnected === true){
		if(entry.driveChangedCB !== undefined){
			entry.driveChangedCB();
		}
	}
});

usbEntry.prototype.initSDK = function(){	
	return usbLib.InitSDK(callback);
}

usbEntry.prototype.getUsbData = function(driveName){	
	try{				
		var data = new Buffer(1000);

		var result = usbLib.GetData(driveName, data);	
		var resultStr = '';

		if(result === 0){
			resultStr = wideCharBufferToString(data);
		}
		
		return resultStr;

	}catch(err){
		console.log(err);
	}
}

usbEntry.prototype.getRemovableDrives = function(){
	try{
		var data = new Buffer(1000);

		var result = usbLib.GetRemovableDrives(data);
		var resultStr = '';

		if(result === 0){
			resultStr = wideCharBufferToString(data);
		}		

		var resultArr = [];
		for(var index = 0; index < resultStr.length; ++index){
			resultArr.push(resultStr[index]);
		}
				
		return resultArr;

	}catch(err){
		console.log(err);
	}
}

usbEntry.prototype.getUsbDataFromRemovableDrives = function(){
	var drives = this.getRemovableDrives();
	var resultStr = '';

	for(var index = 0; index < drives.length; ++index){
		var driveName = drives[index];
		var usbDataStr = this.getUsbData(driveName);

		if(usbDataStr.length > 0){
			resultStr = usbDataStr;
			break;
		}
	}

	return resultStr;
}

usbEntry.prototype.setUpDriveChangedCallBack = function(cb){
	if(typeof cb !== 'function'){
		return;
	}

	this.driveChangedCB = cb;
}

usbEntry.prototype.clearDriveChangedCallBack = function(){
	this.driveChangedCB = undefined;
}

var entry = new usbEntry();
entry.initSDK();

module.exports = entry;