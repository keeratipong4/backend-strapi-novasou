import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_grids';
  info: {
    description: 'Grid of features or items';
    displayName: 'Feature Grid';
    icon: 'grid';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    items: Schema.Attribute.Component<'elements.card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['icon-card', 'image-card', 'icon-minimal']
    > &
      Schema.Attribute.DefaultTo<'icon-card'>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: 'Hero section';
    displayName: 'Hero';
    icon: 'crown';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    layout: Schema.Attribute.Enumeration<['center', 'split']> &
      Schema.Attribute.DefaultTo<'center'>;
    links: Schema.Attribute.Component<'elements.link', true>;
    subheadline: Schema.Attribute.Text;
  };
}

export interface BlocksMediaTextSplit extends Struct.ComponentSchema {
  collectionName: 'components_blocks_media_text_splits';
  info: {
    description: 'Text with media side-by-side';
    displayName: 'Media Text Split';
    icon: 'columns';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    content: Schema.Attribute.RichText;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials_lists';
  info: {
    description: 'List of testimonials';
    displayName: 'Testimonials List';
    icon: 'smile';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.testimonial', true>;
    layout: Schema.Attribute.Enumeration<['grid', 'carousel']> &
      Schema.Attribute.DefaultTo<'grid'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    description: 'A generic card for features, items, etc.';
    displayName: 'Card';
    icon: 'layer-group';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: 'A reusable link component';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface ElementsSeo extends Struct.ComponentSchema {
  collectionName: 'components_elements_seos';
  info: {
    description: 'SEO Metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_elements_testimonials';
  info: {
    description: 'A testimonial item';
    displayName: 'Testimonial';
    icon: 'quote-right';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    avatar: Schema.Attribute.Media<'images'>;
    company: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.feature-grid': BlocksFeatureGrid;
      'blocks.hero': BlocksHero;
      'blocks.media-text-split': BlocksMediaTextSplit;
      'blocks.testimonials': BlocksTestimonials;
      'elements.card': ElementsCard;
      'elements.link': ElementsLink;
      'elements.seo': ElementsSeo;
      'elements.testimonial': ElementsTestimonial;
    }
  }
}
