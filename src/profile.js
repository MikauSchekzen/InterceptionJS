function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.DEVICE_TYPE_KEYBOARD = 0;
Profile.DEVICE_TYPE_MOUSE    = 1;

Profile.MOUSE_WHEEL_NONE = 0;
Profile.MOUSE_WHEEL_V    = 1;
Profile.MOUSE_WHEEL_H    = 2;

Profile.MOUSE_MOVE_REL  = 1;
Profile.MOUSE_MOVE_ABS  = 2;


Profile.prototype.initialize = function() {
  this.initMembers();
}

Profile.prototype.initMembers = function() {
}

Profile.prototype.core = function() {
  return Core;
}

Profile.prototype.handleInterception = function(keyCode, keyDown, keyE0, hwid, deviceType, mouseWheel, mouseMove, x, y) {
  var sendDefault = true;

  if(keyDown) {
    if(deviceType === Profile.DEVICE_TYPE_KEYBOARD) {
      var key = Input.indexToString(keyCode, keyE0);
      console.log(key);
      if(key === "escape") close();
      if(key === "q") {
        Core.send("mousewheel", true, 0, 100);
      }
      if(key === "f") {
        Core.send("a", keyDown);
        sendDefault = false;
      }
    }
  }
  if(deviceType === Profile.DEVICE_TYPE_MOUSE) {
    if(keyCode > 0) {
      if(mouseWheel === Profile.MOUSE_WHEEL_V) {
        // console.log("y" + y.toString());
      }
      else if(mouseWheel === Profile.MOUSE_WHEEL_H) {
        // console.log("x" + x.toString());
      }
      else {
        // sendDefault = false;
        console.log(Input.mouseIndexToString(keyCode));
      }
    }
    else {
      // console.log(x.toString() + "," + y.toString());
    }
  }
  if(sendDefault) Core.send_default();
}
