// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AstroContents } from './collections/AstroContents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // カスタムダッシュボードを設定
    components: {
      // ダッシュボードの上部にカスタムコンポーネントを追加
      beforeDashboard: [
        // コンポーネントのパスを指定（このファイルはまだ作成していません）
        path.resolve(__dirname, './components/AstroDashboard.tsx'),
      ],
    },
    // メニューのグループ化
    nav: {
      // カスタムグループ
      'Astroサイト': [
        'astro-contents',
      ],
      // デフォルトグループ
      'CMS': [
        'media',
      ],
      'Admin': [
        'users',
      ],
    },
  },
  collections: [Users, Media, AstroContents],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
