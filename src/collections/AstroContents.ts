import { CollectionConfig } from 'payload/types';

export const AstroContents: CollectionConfig = {
  slug: 'astro-contents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'タイトル',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'スラッグ',
      admin: {
        description: 'URLに使用される識別子（例：my-first-post）',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'カテゴリー',
      options: [
        {
          label: 'ニュース',
          value: 'news',
        },
        {
          label: 'ブログ',
          value: 'blog',
        },
        {
          label: '製品情報',
          value: 'products',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: '公開日',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'アイキャッチ画像',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      label: '本文',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: '抜粋',
      admin: {
        description: '記事の短い説明（検索結果やリスト表示で使用）',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'MEタディスクリプション',
      admin: {
        description: 'SEO用の説明文',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'タグ',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'ステータス',
      defaultValue: 'draft',
      options: [
        {
          label: '下書き',
          value: 'draft',
        },
        {
          label: '公開',
          value: 'published',
        },
      ],
    },
  ],
};
