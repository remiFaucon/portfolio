import {Inject, Injectable} from '@angular/core';
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
    private router : Router,
  ) {}

  addTags(title: string, description:string, image?:string , video?:string) {
    this.meta.addTags([{ name: "author", content: "Rémi Faucon" }]);
    this.title.setTitle(title);
    this.addSharingTags(
      this.router.url,
      title,
      description,
      'fr_FR',
      image,
      video
    )
  }

  addSharingTags(url: string ,title: string, description: string, locale: string, image?: string, video?: string) {
    let tags: MetaDefinition[]
    tags = [
      { property: "og:site_name", content: "remi-faucon.fr"},
      { property: "og:title", content: title},
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:description", content: description},
      { property: "og:locale", content: locale },

      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: url },
      { property: "twitter:site", content: "@remi-faucon.fr" },
      { property: "twitter:creator", content: "@RmiFaucon1" },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description },
    ]
    if(image){
      tags.push({ property: "og:image", content: image })
      tags.push({ property: "twitter:image", content: image })
    }
    if(video){
      tags.push({ property: "og:video", content: video })
    }
    this.meta.addTags(tags)
  }
}
