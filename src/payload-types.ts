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
    'api-users': ApiUser;
    redirects: Redirect;
  };
  globals: {
    footer: Footer;
  };
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
            value: string;
            relationTo: 'organisations';
          }
        | {
            value: string;
            relationTo: 'circles';
          }
      )[]
    | (
        | {
            value: Organisation;
            relationTo: 'organisations';
          }
        | {
            value: Circle;
            relationTo: 'circles';
          }
      )[];
  eventOrganizer?: string;
  eventExtra?: string;
  category?: ('concert' | 'movie' | 'theater' | 'plenum' | 'workshop')[];
  displayOnHome?: boolean;
  displayOnOverview?: boolean;
  displayOnOrgansation?: boolean;
  displayOnCircle?: boolean;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Media {
  id: string;
  alt: string;
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
    portrait?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    hero?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface Organisation {
  id: string;
  name: string;
  shortName: string;
  layout?: (
    | {
        title: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
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
        size?: 'normal' | 'wide';
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
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
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
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Circle {
  id: string;
  name: string;
  hiddenType?: string;
  organisation: string | Organisation;
  color: string;
  description?: string;
  circleImage?: string | Media;
  fallbackImage: string;
  layout?: (
    | {
        title: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
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
        size?: 'normal' | 'wide';
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
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
      }
  )[];
  meta?: {
    title?: string;
    description?: string;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roles: ('public' | 'editor' | 'admin')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Page {
  id: string;
  title: string;
  slug?: string;
  layout?: (
    | {
        title: string;
        text: string;
        href: string;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
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
        size?: 'normal' | 'wide';
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
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        title: string;
        teaser?: string;
        level: 'h1' | 'h2' | 'h3' | 'h4';
        anchor?: string;
        id?: string;
        blockName?: string;
        blockType: 'headlineBlock';
      }
  )[];
  parent?: string | Page;
  breadcrumbs?: {
    doc?: string | Page;
    url?: string;
    label?: string;
    id?: string;
  }[];
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
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Redirect {
  id: string;
  from: string;
  to: {
    type?: 'reference' | 'custom';
    reference: {
      value: string | Page;
      relationTo: 'pages';
    };
    url: string;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Footer {
  id: string;
  columns?: {
    navItems?: {
      link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference: {
          value: string | Page;
          relationTo: 'pages';
        };
        url: string;
        label: string;
      };
      id?: string;
    }[];
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
