import React, { useEffect, useState } from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import { useConfig } from 'payload/components/utilities';

// Astroサイト用のダッシュボードコンポーネント
const AstroDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    categories: {},
  });
  const [loading, setLoading] = useState(true);
  const { routes } = useConfig();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 公開コンテンツの統計情報を取得
        const publishedRes = await fetch('/api/astro-contents?status=published&limit=0');
        const publishedData = await publishedRes.json();
        
        // 下書きコンテンツの統計情報を取得
        const draftRes = await fetch('/api/astro-contents?status=draft&limit=0');
        const draftData = await draftRes.json();
        
        // カテゴリごとの集計
        const categoryStats = {};
        const allContents = [...publishedData.docs, ...draftData.docs];
        
        allContents.forEach(content => {
          if (!categoryStats[content.category]) {
            categoryStats[content.category] = 0;
          }
          categoryStats[content.category]++;
        });
        
        setStats({
          total: publishedData.totalDocs + draftData.totalDocs,
          published: publishedData.totalDocs,
          draft: draftData.totalDocs,
          categories: categoryStats,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <div className="dashboard-section">
        <h2>Astroサイトコンテンツ</h2>
        <div>データを読み込み中...</div>
      </div>
    );
  }
  
  return (
    <div className="dashboard-section" style={{ 
      marginBottom: '2rem', 
      padding: '2rem', 
      background: '#f7f9fc', 
      borderRadius: '4px' 
    }}>
      <h2 style={{ marginTop: 0 }}>Astroサイトコンテンツ統計</h2>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ 
          flex: 1, 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '4px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>コンテンツ合計</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#24b47e' }}>{stats.total}</div>
        </div>
        
        <div style={{ 
          flex: 1, 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '4px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>公開済み</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a6ee0' }}>{stats.published}</div>
        </div>
        
        <div style={{ 
          flex: 1, 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '4px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>下書き</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f58300' }}>{stats.draft}</div>
        </div>
      </div>
      
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '4px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>カテゴリ別</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} style={{ 
              padding: '0.5rem 1rem', 
              background: '#f1f5f9', 
              borderRadius: '100px',
              fontSize: '0.9rem',
            }}>
              {category}: <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <a
          href={`${routes.admin}/collections/astro-contents/create`}
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#24b47e',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          新規コンテンツ作成
        </a>
      </div>
    </div>
  );
};

export default AstroDashboard;
