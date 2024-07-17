import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  @Input() width
  @Input() height
  @Output() generateCode = new EventEmitter()
  @ViewChild('captchaContainer') container
  canvas = document.createElement('canvas')
  //letters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  letters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  code = ''

  constructor() { }

  ngOnInit() {
    this.init()
    this.refresh()
  }

  onClick() {
    this.refresh()
  }

  private init() {
    this.canvas.width = this.width || 100
    this.canvas.height = this.height || 50
    this.canvas.style.cursor = 'pointer'
    this.canvas.innerHTML = '您的浏览器版本不支持canvas'
    this.container.nativeElement.appendChild(this.canvas)
  }

  // generate code
  private refresh() {
    this.code = ''
    const ctx = this.canvas.getContext('2d')
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.randomColor(180, 240)
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < 5; i++) {
      const letter = this.letters[this.randomNum(0, this.letters.length)]
      this.code += letter
      ctx.font = this.randomNum(this.canvas.height / 2, this.canvas.height) + 'px SimHei'
      ctx.fillStyle = this.randomColor(50, 160)
      ctx.shadowOffsetX = this.randomNum(-3, 3)
      ctx.shadowOffsetY = this.randomNum(-3, 3)
      ctx.shadowBlur = this.randomNum(-3, 3)
      ctx.shadowColor = 'rgb(0, 0, 0, 0.3)'
      const x = this.canvas.width / 5 * i
      const y = this.canvas.height / 2
      const deg = this.randomNum(-30, 30)
      // setting rotate and origin point
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(letter, 0, 0)
      // reset rotate and origin point
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    }

    // draw interfering line
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = this.randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(this.randomNum(0, this.canvas.width), this.randomNum(0, this.canvas.height))
      ctx.lineTo(this.randomNum(0, this.canvas.width), this.randomNum(0, this.canvas.height))
      ctx.stroke()
    }

    // draw interfering point
    for (let i = 0; i < this.canvas.width / 5; i++) {
      ctx.fillStyle = this.randomColor()
      ctx.beginPath()
      ctx.arc(this.randomNum(0, this.canvas.width), this.randomNum(0, this.canvas.height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }

    this.generateCode.emit(this.code.toLowerCase())
  }

  /**
   * return a random integer
   * @param min 最小值
   * @param max 最大值
   */
  private randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  /**
   * return a random color
   */
  private randomColor(min = 0, max = 255) {
    const r = this.randomNum(min, max)
    const g = this.randomNum(min, max)
    const b = this.randomNum(min, max)
    return `rgb(${r}, ${g}, ${b})`
  }

}
