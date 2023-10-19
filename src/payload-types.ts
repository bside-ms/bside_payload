/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    events: Event;
    circles: Circle;
    organisations: Organisation;
    media: Media;
    users: User;
    pages: Page;
    'contact-forms': ContactForm;
    'not-found-pages': NotFoundPage;
    'api-users': ApiUser;
    redirects: Redirect;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface Event {
  id: string;
  title: string;
  richText: {
    [k: string]: unknown;
  }[];
  eventImage?: string | Media;
  eventLocation: string;
  eventDate: string;
  eventStart: string;
  eventEnd?: string;
  eventOwner?:
    | (
        | {
            relationTo: 'organisations';
            value: string;
          }
        | {
            relationTo: 'circles';
            value: string;
          }
      )[]
    | (
        | {
            relationTo: 'organisations';
            value: Organisation;
          }
        | {
            relationTo: 'circles';
            value: Circle;
          }
      )[];
  eventOrganizer?: string;
  eventExtra?: string;
  category?: ('concert' | 'movie' | 'theater' | 'plenum' | 'workshop')[];
  displayOnHome?: boolean;
  displayOnOverview?: boolean;
  displayOnOrganisation?: boolean;
  displayOnCircle?: boolean;
  slug?: string;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Media {
  id: string;
  alt: string;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    event?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    wide?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  roles: ('public' | 'editor' | 'admin')[];
  circles?: string[] | Circle[];
  sub?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Circle {
  id: string;
  name: string;
  hiddenType?: string;
  organisation: string | Organisation;
  description?: string;
  circleImage?: string | Media;
  fallbackImage: string;
  layout?: (
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        as: 'h1' | 'h2' | 'h3' | 'h4';
        backgroundColor: 'white' | 'black';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
      }
    | {
        backgroundColor: 'white' | 'black';
        backgroundWidth: 'full' | 'block';
        columns?: {
          width: 'full' | 'half' | 'oneThird' | 'twoThirds';
          richText: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        media: string | Media;
        size?: 'normal' | 'wide' | 'event';
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        caption?: string;
        id?: string;
        blockName?: string;
        blockType: 'mediaBlock';
      }
    | {
        alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
        backgroundColor: 'white' | 'black';
        headline?: string;
        media: string | Media;
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        headlineTitle: string;
        headlineTeaser?: string;
        reversed?: boolean;
        linkText: string;
        linkHref: string;
        image: string | Media;
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'teaser';
      }
    | {
        title?: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
      }
    | {
        title: string;
        eventSide: 'textLeft' | 'textRight';
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'eventOverview';
      }
  )[];
  meta?: {
    title?: string;
    description?: string;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Organisation {
  id: string;
  name: string;
  shortName: string;
  layout?: (
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        as: 'h1' | 'h2' | 'h3' | 'h4';
        backgroundColor: 'white' | 'black';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
      }
    | {
        backgroundColor: 'white' | 'black';
        backgroundWidth: 'full' | 'block';
        columns?: {
          width: 'full' | 'half' | 'oneThird' | 'twoThirds';
          richText: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        media: string | Media;
        size?: 'normal' | 'wide' | 'event';
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        caption?: string;
        id?: string;
        blockName?: string;
        blockType: 'mediaBlock';
      }
    | {
        alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
        backgroundColor: 'white' | 'black';
        headline?: string;
        media: string | Media;
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        title?: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
      }
    | {
        headlineTitle: string;
        headlineTeaser?: string;
        reversed?: boolean;
        linkText: string;
        linkHref: string;
        image: string | Media;
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'teaser';
      }
    | {
        title: string;
        eventSide: 'textLeft' | 'textRight';
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'eventOverview';
      }
    | {
        title: string;
        circleSide: 'textLeft' | 'textRight';
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'circleOverview';
      }
  )[];
  meta?: {
    title?: string;
    description?: string;
  };
  hiddenType?: string;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Page {
  id: string;
  title: string;
  slug?: string;
  layout?: (
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        as: 'h1' | 'h2' | 'h3' | 'h4';
        backgroundColor: 'white' | 'black';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
      }
    | {
        backgroundColor: 'white' | 'black';
        backgroundWidth: 'full' | 'block';
        columns?: {
          width: 'full' | 'half' | 'oneThird' | 'twoThirds';
          richText: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        media: string | Media;
        size?: 'normal' | 'wide' | 'event';
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        caption?: string;
        id?: string;
        blockName?: string;
        blockType: 'mediaBlock';
      }
    | {
        alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
        backgroundColor: 'white' | 'black';
        headline?: string;
        media: string | Media;
        effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[];
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        title?: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
      }
    | {
        headlineTitle: string;
        headlineTeaser?: string;
        reversed?: boolean;
        linkText: string;
        linkHref: string;
        image: string | Media;
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'teaser';
      }
    | {
        title: string;
        eventSide: 'textLeft' | 'textRight';
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'eventOverview';
      }
    | {
        sliderType: 'imageSlider';
        imageSlides: {
          image: string | Media;
          description?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'slider';
      }
  )[];
  parent?: string | Page;
  breadcrumbs?: {
    doc?: string | Page;
    url?: string;
    label?: string;
    id?: string;
  }[];
  meta?: {
    title?: string;
    description?: string;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface ContactForm {
  id: string;
  fullName: string;
  mailAddress: string;
  message: string;
  sendCopyToSender?: string;
  recipient: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface NotFoundPage {
  id: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface ApiUser {
  id: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
}
export interface Redirect {
  id: string;
  from: string;
  to: {
    type?: 'reference' | 'custom';
    reference: {
      relationTo: 'pages';
      value: string | Page;
    };
    url: string;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'api-users';
        value: string | ApiUser;
      };
  key?: string;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string;
  batch?: number;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes {
    collections: {
      'events': Event
      'circles': Circle
      'organisations': Organisation
      'media': Media
      'users': User
      'pages': Page
      'contact-forms': ContactForm
      'not-found-pages': NotFoundPage
      'api-users': ApiUser
      'redirects': Redirect
      'payload-preferences': PayloadPreference
      'payload-migrations': PayloadMigration
    }

  }
}