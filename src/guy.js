import {leftKey, rightKey} from './keys.js'
import Body from './body.js'
import create from './create.js'

export default class Guy extends Body {
  constructor (x, y) {
    super(create('svg'))
    this.element.innerHTML = `
    <svg id="guy">
      <g id="inner-guy">
        <rect class="accent" x="2" y="7" width="20" height="11"/>
        <rect id="left_foot" class="accent" x="4" y="28" width="6" height="20"/>
        <rect id="right_foot" class="accent" x="14" y="28" width="6" height="20"/>
        <rect class="accent" x="5" y="28" width="15" height="5"/>
        <!--<g id="head">
          <!--<rect class="accent" x="0" y="0" width="26" height="19"/>
          <rect id="face" x="4" y="3" width="20" height="14"/>
          <rect class="accent" x="9" y="7" width="4" height="4"/>
          <rect class="accent" x="17" y="7" width="4" height="4"/>-->
          <rect class="accent" x="0" y="-25" width="25" height="20"/>
          <rect id="face" class="secondary" x="5" y="-20" width="3" height="3"/>
          <rect id="face" class="secondary" x="15" y="-20" width="3" height="3"/>
          <rect id="face" class="secondary" x="3" y="-11" width="18" height="2"/>
        </g>-->
        <rect class="accent" x="1" y="-3" width="22" height="30"/>
        <rect class="accent" x="-5" y="-3" width="34" height="5"/>
        <rect class="accent" x="-5" y="-3" width="5" height="35"/>
        <rect class="accent" x="24" y="-3" width="5" height="35"/>
      </g>
    </svg>`
    this.load(x, y)
    this.height = 48
    this.width = 26
    this.speed = 360
    this.vx = 0
    this.vy = 0
  }

  tick (scale) {
    if (leftKey() && !rightKey()) {
      this.vx = -scale(this.speed)
      this.faceLeft = true
    } else if (rightKey() && !leftKey()) {
      this.vx = scale(this.speed)
      this.faceLeft = false
    } else {
      this.vx = 0
    }

    this.walking = leftKey() || rightKey()
  }

  get faceLeft () {
    return !!this._faceLeft
  }

  set faceLeft (value) {
    this._faceLeft = !!value
    this.element.classList.toggle('left', this.faceLeft)
  }

  get walking () {
    return !!this._walking
  }

  set walking (value) {
    this._walking = !!value
    this.element.classList.toggle('walk', this.walking)
  }

  load (x, y) {
    this.x = x
    this.y = y
  }

  toJSON () {
    return [Math.round(this.x), Math.round(this.y)]
  }
}
