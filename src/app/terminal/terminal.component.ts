import {
  ApplicationRef,
  Component, ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router'
import {isEmpty, throwIfEmpty} from "rxjs";
import {element} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

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
  constructor(private router: Router) {}
  ngOnInit(): void {
    (async () => {
      await this.showTerminalContent()
        setTimeout(() =>{
          let input = document.querySelector("app-terminal .terminal div:last-of-type p span:last-of-type")!;
          let toggle = true
          setInterval(() => {
            if (toggle)
              input.classList.toggle("hiddenInput");
            else{
              input.classList.add("hiddenInput");
              return
            }
          }, 750)
          document.addEventListener("keydown", async (e) => {
            e.preventDefault()
            if (action(e.key) === "inner") {
              input.innerHTML = input.innerHTML + e.key
            } else if (action(e.key) === "outer") {
              input.innerHTML = input.innerHTML.slice(0, -1)
            } else if (action(e.key) === "enter") {
              toggle = false
              if (input.innerHTML === "home") {
                await this.router.navigate(["/"])
              } else if (input.innerHTML === "service") {
                await this.router.navigate(["/services"])
              } else if (input.innerHTML === "project") {
                await this.router.navigate(["/realisation"])
              } else if (input.innerHTML === "about") {
                await this.router.navigate(["/a-propos"])
              } else if (input.innerHTML === "sudo rm -rf /") {
                await this.deletePage().then(() => this.router.navigate(["/contact"]))
                await this.router.navigate(["/contact"])
              }
            }
          })
        }, 1)
    }) ()

    function action(key: string): string|void {
      let letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-", "/", " "]
      if(letter.includes(key)) return "inner"
      else if (key === "Backspace") return "outer"
      else if (key === "Enter") return "enter"
    }
  }

  private async addLine(text: string, line: number, writeSpeed:number = 0, writeAtEnd:number = 0, timeOut = 0): Promise<void>{
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

  private async showTerminalContent():Promise<void> {
    await this.addLine("<p><span class=\"green\">user@machine:</span><span class=\"blue\">~</span>$ </p>", 1)
    await this.addLine("home", 1, 200, 4, 1000)
    await this.addLine(
      "<p>Commands:</p>" +
      "<div class='commandsList'>" +
      "<div class='commands'>" +
      "<p>home</p>" +
      "<p>service</p>" +
      "<p>project</p>" +
      "<p>about</p>" +
      "<p>sudo rm -rf /</p>" +
      "</div>" +
      "<div class='commandsDescription'>" +
      "<p>Go to the home page</p>" +
      "<p>Do you want a coffee?</p>" +
      "<p>It's alright, view the matrix</p>" +
      "<p>About me</p>" +
      "<p>Please no !</p>" +
      "</div>" +
      "</div>", 2, 0, 0, 1000)
    await this.addLine("<p><span class=\"green\">user@machine:</span><span class=\"blue\">~</span>$ <span class='input'></span></p>", 3, 0, 0, 1000)
    return
  }

  private async deletePage(): Promise<void> {
    const promise = new Promise<void>(async (resolve, reject) => {
      let elements = Array.from(document.querySelectorAll("p, h1, h2, a"))
      let currentIndex = elements.length
      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [elements[currentIndex], elements[randomIndex]] = [elements[randomIndex], elements[currentIndex]];
      }
      elements.forEach((element, index) => {
        setTimeout(() => element.remove(), 300 * index);
      })
    })
    return await promise
  }
}
