import React from 'react';
import styles from './index.less';

export default function IndexPage() {
  const [data, setData] = React.useState<string[]>([]);

  const query = React.useCallback(async function () {
    const res = await window.fetch('/api/hello');
    const json = await res.json();
    setData(json);
  }, [])

  React.useEffect(() => {
    query();
  }, [query])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page index</h1>
      {
        data.map(value =>
          <span key={value}>{`${value} `}</span>
        )
      }
    </div>
  );
}
