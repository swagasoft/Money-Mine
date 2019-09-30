import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  title = 'money mine';

  constructor(private meta: Meta)  {
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
    this.meta.addTag({ name: 'twitter:title', content: 'Front-end Web Development, Chewed Up' });
    this.meta.addTag({ name: 'twitter:description', content: 'Learn frontend web development...' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://alligator.io/images/front-end-cover.png' });
  }
}
