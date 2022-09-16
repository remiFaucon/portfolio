import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const cross = document.querySelector(".terminalHeader div:last-of-type")!
    cross.addEventListener("mouseover", () => cross.querySelector("svg")!.classList.remove("hidden"))
    cross.addEventListener("mouseleave", () => cross.querySelector("svg")!.classList.add("hidden"))

    const toShow = "portfolio --info"
    const whereShow = document.getElementById("toShow")!
    const lastText = document.querySelector(".terminal .hidden:last-child")!
    const toggleElement = document.querySelector("app-terminal a:last-child span:last-child")!;

    (async () => {
      await this.showingCommand(toShow, whereShow)
      await this.showingText(lastText)
      setInterval(() => {
        toggleElement.classList.toggle("hidden")
      }, 750)

      document.addEventListener("keydown", (e) => {
        const input = lastText.querySelector("#input")!
        if (e.key === "Y" || e.key === "y"){
          input.innerHTML = input.innerHTML + e.key
          setTimeout(() => {
            this.router.navigateByUrl('/realisations')
          }, 500)
        }
        else if (e.key === "n" || e.key === "N"){
          input.innerHTML = input.innerHTML + e.key
        }
      })
    })()
  }

  showingCommand(toShow: string, whereShow: HTMLElement): Promise<any> {
    const characters = toShow.split("")
    return new Promise((successCallback) => {
      setTimeout(() => {
        let showed: string = ""
        characters.forEach((character, index) => {
          setTimeout(() => {
            showed += character
            if (character === " ")
              character = "&nbsp;"
            whereShow.innerHTML = whereShow.innerHTML + character
            if (showed.length === toShow.length)
              successCallback("commandSowing")
          }, index * 100)
        })
       }, 2000)
    })
  }

  showingText(lastText: Element): Promise<string> {
    return new Promise((successCallback) => {
      const text = document.querySelectorAll(".terminal .hidden:not(:last-child)")
      setTimeout(() => {
        text.forEach(element => element.classList.remove("hidden"))
      }, 1000)
      setTimeout(() => {
        lastText.classList.remove("hidden")
        successCallback("textShowing")
      }, 1500)
    })
  }

}
