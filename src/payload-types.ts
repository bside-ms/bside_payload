/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    'api-users': ApiUser;
    events: Event;
    pages: Page;
    media: Media;
    redirects: Redirect;
  };
  globals: {
    footer: Footer;
    'main-menu': MainMenu;
  };
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roles: ('public' | 'editor' | 'admin')[];
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface ApiUser {
  id: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
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
  eventOrganizer?: string;
  eventExtra?: string;
  category?: ('concert' | 'movie' | 'theater' | 'plenum' | 'workshop' | 'workshop')[];
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
  darkModeFallback?: string | Media;
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
export interface Page {
  id: string;
  title: string;
  richText: {
    [k: string]: unknown;
  }[];
  slug?: string;
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
  columns: {
    navItems: {
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
}
export interface MainMenu {
  id: string;
  navItems: {
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
}
