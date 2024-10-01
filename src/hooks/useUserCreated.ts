import { useState, useEffect } from 'react';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { useUser } from '@/app/(auth)/context/UserContext';
import { GatheringsListData } from '@/types/data.type';

export const useUserCreated = () => {
  const { user } = useUser();
  const [gatheringsList, setGatheringsList] = useState<GatheringsListData[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGatheringsData = async () => {
      if (user) {
        setIsLoading(true);

        try {
          const gatherings = await getGatherings({
            createdBy: String(user.id),
          });
          setGatheringsList(gatherings);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGatheringsData();
  }, [user]);

  return { gatheringsList, isLoading };
};
