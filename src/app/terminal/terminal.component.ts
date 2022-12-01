import {
  Component, HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router'

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
  private input: Element | undefined;
  private toggle = true

  constructor(private router: Router) {
    console.log(this)
  }

  ngOnInit(): void {
    this.showTerminalContent().then(() => {
      setInterval(() => {
        if (!this.input){
          this.input = document.querySelector(".terminal div:last-of-type p span:last-of-type")!;
        }
        if (this.toggle)
          this.input!.classList.toggle("hiddenInput");
        else{
          this.input!.classList.add("hiddenInput");
          return
        }
      }, 750)
    })
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
    await this.addLine("portfolio --config", 1, 150, 4, 1000)
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

 @HostListener('window:keydown', ['$event'])
 private async onKeyDown ($e: KeyboardEvent) {
   $e.preventDefault()
   this.input = document.querySelector(".terminal div:last-of-type p span:last-of-type")!
   const result = action($e.key)
   if (result === "inner") {
     this.input!.innerHTML = this.input!.innerHTML + $e.key
   }
   else if (result === "outer") {
     this.input!.innerHTML = this.input!.innerHTML.slice(0, -1)
   }
   else if (result === "enter") {
     this.toggle = false
     switch (this.input!.innerHTML) {
       case "home":
         await this.router.navigate(["/"])
         break
       case "service":
         await this.router.navigate(["/services"])
         break
       case "project":
         await this.router.navigate(["/realisation"])
         break
       case "about":
         await this.router.navigate(["/a-propos"])
         break
       case "sudo rm -rf /":
         await this.deletePage()
         await this.router.navigate(["/contact"])
         break
     }
   }

   function action(key: string): string | void {
     let letter = [
       "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
       "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
       "u", "v", "w", "x", "y", "z", "-", "/", " "
     ]
     if (letter.includes(key)) return "inner"
     else if (key === "Backspace") return "outer"
     else if (key === "Enter") return "enter"
   }

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
      setTimeout(() => {
        resolve()
      }, 300 * elements.length)
    })
    return await promise
  }
}
