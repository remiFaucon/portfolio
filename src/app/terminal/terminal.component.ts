import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router'
import {isEmpty, throwIfEmpty} from "rxjs";

export interface character {
  val: string
  pos: number
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements OnInit {
  terminalContent = new Map()
  toggle: boolean = true
  cssClass: string = "hidden"
  constructor(private router: Router) {
    // this.terminalContent.set(1, )
  }
  ngOnInit(): void {
    (async () => {
      this.showTerminalContent().then(() => {
        let toggleElement = document.querySelector("app-terminal .terminal div:last-of-type a span:last-of-type")!;
        setInterval(() => {
          this.toggle = !this.toggle
        }, 750)
      })

      document.addEventListener("keydown", async (e) => {
        const input = lastText.querySelector("#input")!
        if (e.key === "Y" || e.key === "y") {
          input.innerHTML = input.innerHTML + e.key
          setTimeout(() => {
            this.router.navigateByUrl('/propos')
          }, 500)
        } else if (e.key === "n" || e.key === "N") {
          input.innerHTML = input.innerHTML + e.key
          const newCommand = document.createElement("p")
          const terminal = document.querySelector(".terminal")!
          newCommand.classList.add("commandInput")
          newCommand.innerHTML = "<span class=\"green\">user@machine:</span><span class=\"blue\">~</span>$ <span id=\"toShow\"></span>"
          terminal.appendChild(newCommand)
          // await this.showingCommand("sudo rm -rf /", newCommand)
        }
      })
    }) ()
    const lastText = document.querySelector(".terminal .hidden:last-child")!;

    // })()
  }

  // showingCommand(toShow: string, whereShow: HTMLElement): Promise<any> {
  //   const characters = toShow.split("")
  //   return new Promise((successCallback) => {
  //     setTimeout(() => {
  //       let showed: string = ""
  //       characters.forEach((character, index) => {
  //         setTimeout(() => {
  //           showed += character
  //           if (character === " ")
  //             character = "&nbsp;"
  //           whereShow.innerHTML = whereShow.innerHTML + character
  //           if (showed.length === toShow.length)
  //             successCallback("commandSowing")
  //         }, index * 100)
  //       })
  //      }, 2000)
  //   })
  // }
  //
  // showingText(lastText: Element): Promise<string> {
  //   return new Promise((successCallback) => {
  //     const text = document.querySelectorAll(".terminal .hidden:not(:last-child)")
  //     setTimeout(() => {
  //       text.forEach(element => element.classList.remove("hidden"))
  //     }, 1000)
  //     setTimeout(() => {
  //       lastText.classList.remove("hidden")
  //       successCallback("textShowing")
  //     }, 1500)
  //   })
  // }

  async addLine(text: string, line: number, writeSpeed:number = 0, writeAtEnd:number = 0, timeOut = 0): Promise<void>{
    if (!line)
      line = this.terminalContent.size
    const promise = new Promise<void>((resolve) => {
      setTimeout(async () => {
        let characters = text.split("")
        if (writeSpeed) {
          for (const character of characters) {
            const promise1 = new Promise<void>((resolve) => {
              setTimeout(() => {
                let lineContent = this.terminalContent.get(line)
                const ar = lineContent.split('')
                let temp: Array<character> = []
                for (let i = -(writeAtEnd - lineContent.length); i <= lineContent.length; i++) {
                  temp[temp.length] = {val: ar[i], pos: i + 1}
                  if (lineContent.length == i) {
                    ar[-(writeAtEnd - lineContent.length)] = character
                    temp.forEach(element => ar[element.pos] = element.val)
                  }
                }
                text = ar.join("")
                this.terminalContent.set(line, text)
                resolve()
              }, writeSpeed)
            })
            await promise1
          }
        }
        else {
          this.terminalContent.set(line, text)
        }
        resolve()
      }, timeOut)
    })
    return await promise
  }

  async showTerminalContent():Promise<void> {
      await this.addLine("<p class=\"c\"><span class=\"green\">user@machine:</span><span class=\"blue\">~</span>$ </p>", 1)
      await this.addLine("portfolio --config", 1, 100, 4, 1000)
      await this.addLine("<h1>Rémi Faucon,<strong>Developpeur back-end</strong></h1>", 2,0, 0, 1000)
      await this.addLine("<p>Passionné par l’univers du développement depuis mes jeunes âges, j’ai débuté par les langages fondamentaux du web. </p>",
        3,
        0,
        0,
        0
      )
      await this.addLine("<p>J’ai ensuite approfondi mes connaissances en back-end notamenent en PHP, puis j’ai suivi une formation diplomante d’un titre développeur web et web mobile (bac+2).</p>",
        4,
        0,
        0,
        0
      )
      await this.addLine("<a><span class=\"green\">?</span> Découvrir mes réalisations? <span class=\"grey\">(Y/n)</span><span id=\"input\"></span><p [*ngIf]='false'> _</p></a>",
        5,
        0,
        0,
        1000
      )
    return
  }
}
