
function MoveGen(mover, time){
  this.mover = mover
  this.start = 0
  this.stop = 1
  this.time = time

  this.accel = 1
  this.decel = 1
  this.maxSpeed = 0

  this.interrupted = false
}

MoveGen.prototype.ends = function(first, second){
  if(second === undefined){
    this.stop = first
  } else {
    this.start = first
    this.stop = second
  }
  return this
}

MoveGen.prototype.acceleration = function(accel, decel, maxSpeed){
  if(decel === undefined)
    decel = accel

  if(maxSpeed === undefined)
    maxSpeed = 0

  this.accel = accel
  this.decel = decel
  this.maxSpeed = maxSpeed

  return this
}

MoveGen.prototype.callback = function(cb){
  this.callback = cb
  return this
}

MoveGen.prototype.interrupt = function(){
  this.interrupted = true
  return this.callback 
}

MoveGen.prototype.run = function(){
  var time = 0
  var speed = 1 / (60 * this.time)

  var motion = motionGen(this.accel, this.decel, this.maxSpeed)

  function transition(){
    if(!this.interrupted){
      time += speed;
      var pos = this.start + (this.stop - this.start) * motion(time);
      if(time < 1){
        this.mover(pos)
        requestAnimationFrame(transition)
      } else {
        this.mover(this.stop)
        if(this.callback !== undefined){
          var hold = this.callback
          this.callback = undefined
          hold()
        }
      }
    }
  }
  transition = transition.bind(this)

  this.mover(this.start)
  requestAnimationFrame(transition);
  
}
