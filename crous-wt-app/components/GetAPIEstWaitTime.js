import { useEffect, useState } from 'react';

export default function GetAPIEstWaitTime() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cwtapi.arthur-gsy7242.workers.dev/');
        const data = await response.json();
        setData(data.averageWaitTime);
        console.log(data.averageWaitTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading data...</p>}</div>{' '}
    </>
  );
}
