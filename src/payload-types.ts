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
    news: News;
    pages: Page;
    'contact-forms': ContactForm;
    'not-found-pages': NotFoundPage;
    'api-users': ApiUser;
    redirects: Redirect;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    'start-page': StartPage;
    'about-bside': AboutBside;
    'event-page': EventPage;
    'event-archive': EventArchive;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  title: string;
  richText: {
    [k: string]: unknown;
  }[];
  eventImage?: string | Media | null;
  eventLocation: string;
  eventDate: string;
  eventStart: string;
  eventEnd?: string | null;
  eventOwner?:
    | (
        | {
            relationTo: 'organisations';
            value: string | Organisation;
          }
        | {
            relationTo: 'circles';
            value: string | Circle;
          }
      )[]
    | null;
  eventOrganizer?: string | null;
  eventExtra?: string | null;
  category?: ('concert' | 'movie' | 'theater' | 'plenum' | 'workshop')[] | null;
  displayOnHome?: boolean | null;
  displayOnOverview?: boolean | null;
  displayOnOrganisation?: boolean | null;
  displayOnCircle?: boolean | null;
  slug?: string | null;
  identifier?: string | null;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  blurhash?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    event?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    wide?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  roles: ('public' | 'editor' | 'organisator' | 'admin')[];
  circles?: (string | Circle)[] | null;
  sub?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "circles".
 */
export interface Circle {
  id: string;
  name: string;
  hiddenType?: string | null;
  organisation: string | Organisation;
  description?: string | null;
  circleImage?: string | Media | null;
  fallbackImage: string;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organisations".
 */
export interface Organisation {
  id: string;
  name: string;
  shortName: string;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
        | {
            title: string;
            circleSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'circleOverview';
          }
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  hiddenType?: string | null;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
  id: string;
  title: string;
  newsDate: string;
  slug?: string | null;
  newsAuthor?:
    | (
        | {
            relationTo: 'organisations';
            value: string | Organisation;
          }
        | {
            relationTo: 'circles';
            value: string | Circle;
          }
      )[]
    | null;
  newsCategory: 'news' | 'announcements';
  newsImage?: string | Media | null;
  excerpt: string;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
        | {
            sliderType: 'imageSlider';
            imageSlides?:
              | {
                  image: string | Media;
                  description?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'slider';
          }
      )[]
    | null;
  identifier?: string | null;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  slug?: string | null;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
        | {
            sliderType: 'imageSlider';
            imageSlides?:
              | {
                  image: string | Media;
                  description?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'slider';
          }
      )[]
    | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-forms".
 */
export interface ContactForm {
  id: string;
  fullName: string;
  mailAddress: string;
  message: string;
  sendCopyToSender?: string | null;
  recipient: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "not-found-pages".
 */
export interface NotFoundPage {
  id: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "api-users".
 */
export interface ApiUser {
  id: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string | null;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
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
  key?: string | null;
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "start-page".
 */
export interface StartPage {
  id: string;
  title: string;
  textBody: string;
  buttonText: string;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about-bside".
 */
export interface AboutBside {
  id: string;
  title: string;
  textBody: string;
  firstSection: {
    title: string;
    description: string;
  };
  secondSection: {
    title: string;
    description: string;
  };
  thirdSection: {
    title: string;
    description: string;
  };
  fourthSection: {
    title: string;
    description: string;
  };
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-page".
 */
export interface EventPage {
  id: string;
  title: string;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
        | {
            sliderType: 'imageSlider';
            imageSlides?:
              | {
                  image: string | Media;
                  description?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'slider';
          }
      )[]
    | null;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-archive".
 */
export interface EventArchive {
  id: string;
  title: string;
  headerImage?: string | Media | null;
  layout?:
    | (
        | {
            title: string;
            teaser?: string | null;
            level: 'h1' | 'h2' | 'h3' | 'h4';
            as: 'h1' | 'h2' | 'h3' | 'h4';
            backgroundColor: 'white' | 'black';
            anchor?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'headlineBlock';
          }
        | {
            backgroundColor: 'white' | 'black';
            backgroundWidth: 'full' | 'block';
            columns?:
              | {
                  width: 'full' | 'half' | 'oneThird' | 'twoThirds';
                  richText: {
                    [k: string]: unknown;
                  }[];
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'content';
          }
        | {
            media: string | Media;
            size?: ('normal' | 'wide' | 'event') | null;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaBlock';
          }
        | {
            alignment: 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
            backgroundColor: 'white' | 'black';
            headline?: string | null;
            media: string | Media;
            effects?: ('blur' | 'grayscale' | 'desaturated' | 'darker')[] | null;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'mediaContent';
          }
        | {
            title?: string | null;
            text: string;
            href: string;
            id?: string | null;
            blockName?: string | null;
            blockType: 'callToAction';
          }
        | {
            headlineTitle: string;
            headlineTeaser?: string | null;
            reversed?: boolean | null;
            linkText: string;
            linkHref: string;
            image: string | Media;
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'teaser';
          }
        | {
            title: string;
            eventSide: 'textLeft' | 'textRight';
            richText: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'eventOverview';
          }
        | {
            sliderType: 'imageSlider';
            imageSlides?:
              | {
                  image: string | Media;
                  description?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'slider';
          }
      )[]
    | null;
  createdBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedBy?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
